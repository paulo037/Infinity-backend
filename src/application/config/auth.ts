import { sign, verify } from "jsonwebtoken"
import bcrypt from "bcrypt"
import { UserRepositoryMysql } from "../../database/mysql/model/user-repository"
import { NextFunction, Request, Response } from "express"
import { FindUserByEmail } from "../services/user/find-user-by-email "
import { User } from "../../domain/entities/user/user"
import { logger } from "../../logger"

const dotenv = require('dotenv')
dotenv.config()

const AUTH_SECRET = process.env.AUTH_SECRET



export type JwtPayload = {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    ad: boolean,
    iat: number,
    exp: number
}

export type JwtRefresh = {
    email: string,
    iat: number,
    exp: number
}

type UserResponse = {
    first_name: string;
    last_name: string;
    image?: string;
    email: string;
    cpf: string;
}


export class Auth {

    constructor(
        private repository = new UserRepositoryMysql(),
        private findUserByEmail = new FindUserByEmail(repository),

    ) { }


    public getTokens = (user: User) => {


        const now = Math.floor(Date.now() / 1000);

        const payload = {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            ad: user.admin,
            iat: now,
            exp: now + (60 * 60 * 3)
        } as JwtPayload

        const refresh_payload = {
            email: user.email,
            iat: now,
            exp: now + (60 * 60 * 48),
        } as JwtRefresh


        const access_token = sign(payload, AUTH_SECRET as string)
        const refresh_token = sign(refresh_payload, AUTH_SECRET as string)

        return { access_token, refresh_token }
    }


    public signin = async (request: Request, response: Response) => {

        try {

            if (!request.body.email || !request.body.password) {
                return response.status(400).send("Informe o email e a senha!");
            }


            const user = await this.findUserByEmail.execute(request.body.email);

            if (!user) {
                return response.status(400).send("Email/Senha Inválidos!");
            }

            const isMatch = bcrypt.compareSync(request.body.password, user.password);
            if (!isMatch) {
                return response.status(401).send("Email/Senha Inválidos!");

            }


            const { access_token, refresh_token } = this.getTokens(user)



            return response.json({
                access_token: access_token,
                refresh_token: refresh_token,
            })




        } catch (error) {
            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }




    public validateToken = async (request: Request, response: Response) => {
        try {
           
            if (request.user) {
                const user = request.user as JwtPayload
                
                if (new Date(user.exp * 1000) > new Date()) {
                    
                    const userEntity = await this.repository.findById(user.id)
                    
                    if (!userEntity) {
                        return response.status(400).send("Usuário não encontrado!");
                    }
                    
             
                    
                    const { access_token, refresh_token } = this.getTokens(userEntity)
                    
                    let userResponse =  verify(access_token, AUTH_SECRET as string) as any

                    delete userResponse.id
                    

                    return response.json({ user: {...userResponse}, access_token, refresh_token }).status(200)
                }
            }
        } catch (e) {
            return response.send(false).status(401)
        }

        return response.send(false).status(401)

    }





    public refreshToken = async (request: Request, response: Response) => {

        try {

            const cookie = request.cookies.refresh_token
            const token = !!cookie ? cookie : request.body.refresh_token    

            const userLog = token ? verify(token, AUTH_SECRET as string) as JwtRefresh : null


            if (!userLog) {
                return response.status(401).send("Token expirou!");
            }


            if (new Date(userLog.exp * 1000) < new Date()) {
                return response.status(401).send("Token expirou!");
            }


            const user = await this.findUserByEmail.execute(userLog.email);

            if (!user) {
                return response.status(401).send("Token expirou!");
            }


            const { access_token, refresh_token } = this.getTokens(user)
            return response.json({
                access_token: access_token,
                refresh_token: refresh_token,

            })



        } catch (error) {
            return response.status(401).send(error instanceof Error ? error.message : "Houve um erro inesperado")
        }

    }



    public admin = async (request: Request, response: Response) => {

        return response.status(200).json(true )

    }


}