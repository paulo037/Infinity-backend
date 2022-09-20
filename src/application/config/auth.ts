import { sign, verify } from "jsonwebtoken"
import bcrypt from "bcrypt"
import { UserRepositoryMysql } from "../../database/mysql/model/user-repository"
import { NextFunction, Request, Response } from "express"
import { FindUserByEmail } from "../services/user/find-user-by-email "
import { User } from "../../domain/entities/user/user"

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




export class Auth {

    constructor(
        private repository = new UserRepositoryMysql(),
        private findUserByEmail = new FindUserByEmail(repository),

    ) { }


    public getTokens = (user: User) => {


        const now = Math.floor(Date.now() / 1000);

        const payload = {
            id: user.props.id,
            first_name: user.props.first_name,
            last_name: user.props.last_name,
            email: user.props.email,
            ad: user.props.admin,
            iat: now,
            exp: now + (60 * 15)
        } as JwtPayload

        const refresh_payload = {
            email: user.props.email,
            iat: now,
            exp: now + (60 * 60 * 24),
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
                return response.status(400).send("Usuário não encontrado!");
            }

            const isMatch = bcrypt.compareSync(request.body.password, user.props.password);
            if (!isMatch) {
                return response.status(401).send("Email/Senha Inválidos!");

            }




            const { access_token, refresh_token } = this.getTokens(user)


            response.cookie("access_token", `${access_token}`, {
                httpOnly: true,
                maxAge: 60 * 60 * 24,
                sameSite: 'none',
                secure: true,
            });

            response.cookie("Authorization", true, {
                maxAge: 60 * 60 * 24,
                sameSite: 'none',
                secure: true,
            });



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
            const token = request.headers.authorization ? request.headers.authorization.split(' ')[1] : null

            if (token) {
                const user = verify(token, AUTH_SECRET as string) as JwtPayload
                if (new Date(user.exp * 1000) > new Date()) {

                    const userEntity = await this.findUserByEmail.execute(user.email);

                    if (!userEntity) {
                        return response.status(400).send("Usuário não encontrado!");
                    }

                    const { access_token } = this.getTokens(userEntity)

                    return response.json({ user: user, access_token: access_token, }).status(200)
                }
            }
        } catch (e) {
            return response.send(false).status(401)
        }

        return response.send(false).status(401)

    }


    public setCookies = async (request: Request, response: Response, next: NextFunction) => {

        try {
            const access_token = request.headers.authorization ? request.headers.authorization.split(' ')[1] : null
            if (access_token) {
                const user = verify(access_token, AUTH_SECRET as string) as JwtPayload
                if (new Date(user.exp * 1000) > new Date()) {

                    response.cookie("access_token", `${access_token}`, {
                        httpOnly: true,
                        maxAge: (user.exp * 1000) - new Date().getTime(),
                        sameSite: 'none',
                        secure: true,
                    });

                    response.cookie("Authorization", true, {
                        maxAge: (user.exp * 1000) - new Date().getTime(),
                        sameSite: 'none',
                        secure: true,
                    });

                }
            }
        } catch (e) {
            return next()
        }

        return next()

    }



    public refreshToken = async (request: Request, response: Response) => {


        try {

            const token = request.body.refresh_token



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


            // response.cookie("auth._token.local", `Bearer ${access_token}`, {
            //     httpOnly: true,
            //     // maxAge: 60 * 60 * 3,
            //     sameSite: 'none',
            //     secure: true,
            // });

            // response.cookie("auth._refresh_token.local", `Bearer ${refresh_token}`, {
            //     httpOnly: true,
            //     // maxAge: 60 * 60 * 24,
            //     sameSite: 'none',
            //     secure: true,
            // });

            response.cookie("access_token", `${access_token}`, {
                // httpOnly: true,
                maxAge: 60 * 60 * 3,
                sameSite: 'none',
                secure: true,
            });


            return response.json({
                access_token: access_token,
                refresh_token: refresh_token,

            })



        } catch (error) {
            console.log(error)
            return response.status(401).send(error instanceof Error ? error.message : "Houve um erro inesperado")
        }

    }



    public admin = async (request: Request, response: Response) => {

        return response.status(200).json({ admin: true })

    }


}