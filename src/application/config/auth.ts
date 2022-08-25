import jwt from "jwt-simple"
import bcrypt from "bcrypt"
import { UserRepositoryMysql } from "../../database/mysql/model/user-repository"
import { Validation } from "../../domain/validation/validation"
import { Request, Response } from "express"

const dotenv = require('dotenv')
dotenv.config()

const AUTH_SECRET = process.env.AUTH_SECRET



export type JwtPayload = {
    id: number,
    name: string,
    email: string,
    admin: boolean,
    iat: number,
    exp: number
}




export class Auth {

    constructor(
        private repository = new UserRepositoryMysql(),

    ) { }


    public signin = async (request: Request, response: Response) => {
        console.log("aqui \n\n")
        if (!request.body.email || !request.body.password) {
            return response.status(400).send("Informe o email e a senha !");
        }

        const user = await this.repository.findByEmail(request.body.email);

        if (!user) {
            return response.status(400).send("Usuário não encontrado !");
        }

        const isMatch = bcrypt.compareSync(request.body.password, user.props.password);
        if (!isMatch) {
            return response.status(401).send("Email/Senha Inválidos!");

        }

        const now = Math.floor(Date.now() / 1000);

        const payload = {
            id: user.id,
            name: user.props.first_name,
            email: user.props.email,
            admin: user.props.admin,
            iat: now,
            exp: now + (60 * 60 * 24)

        } as JwtPayload

        response.json({
            ...payload,
            token: jwt.encode(payload, AUTH_SECRET as string)

        })
    }



    public validateToken = async (request: Request, response: Response) => {

        debugger
        const token = request.headers.authorization ? request.headers.authorization.split(' ')[1] : null

        try {
            if (token) {
                const user = jwt.decode(token, AUTH_SECRET as string)
                if (new Date(user.exp * 1000) > new Date()) {
                    return response.json({ user: user })
                }
            }
        } catch (e) {
        }

        response.send(false)

    }


}