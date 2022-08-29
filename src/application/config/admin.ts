import { Response, Request, NextFunction } from "express"
import { JwtPayload } from "./auth"


export = (middleware: Function) => {
    return (request: Request, response: Response, next: NextFunction) => {
        try {

            const user = request.user as JwtPayload
            if (user.admin) {
                middleware(request, response, next)
            }
            else {
                response.status(401).send("Usuário não é um administrador !")
            }
        } catch (error) {
            response.status(401).send("Usuário não é um administrador !")

        }

    }

}