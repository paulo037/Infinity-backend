import { Response, Request, NextFunction } from "express"
import { UserRepositoryMysql } from "../../database/mysql/model/user-repository"
import { FindUserByEmail } from "../services/user/find-user-by-email "
import { JwtPayload } from "./auth"

const repository = new UserRepositoryMysql()
const findUserByEmail = new FindUserByEmail(repository)


export = (middleware: Function) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {

            const userJwt = request.user as JwtPayload

            const user = await findUserByEmail.execute(userJwt.email);

            if (!user) {
                return response.status(400).send("Não autorizado!");
            }

            if (user.admin) {
                middleware(request, response, next)
            }
            else {
                return response.status(401).send("Não autorizado!")
            }
        } catch (error) {
            return response.status(401).send("Não autorizado!")

        }

    }

}