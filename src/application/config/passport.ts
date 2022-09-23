import { NextFunction, Request, Response } from "express"
import passport from "passport"
import { Strategy, ExtractJwt } from "passport-jwt"
import { send } from "process"
import { UserRepositoryMysql } from "../../database/mysql/model/user-repository"
import { FindUserByEmail } from "../services/user/find-user-by-email "
import { JwtPayload } from "./auth"

const dotenv = require('dotenv')
dotenv.config()


const AUTH_SECRET = process.env.AUTH_SECRET




const repository = new UserRepositoryMysql()
const findByEmail = new FindUserByEmail(repository)
const params = {
    secretOrKey: AUTH_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}



passport.use(new Strategy(params, async function (payload, done) {
    try {

        const user = await findByEmail.execute(payload.email)
      
        if (user) {
            return done(undefined, { ...payload })
        } else {
            return done(undefined, false)
        }
    } catch (error) {
        console.log(error)
        return done(undefined, false)

    }

}));


export class Passport {



    public authenticate = async (request: Request, response: Response, next: NextFunction) => {
        try {
            passport.authenticate('jwt', function (err, user, info) {
                if (err) {

                    return response.status(401).send('Não autorizado!')
                }
                if (!user) {
                    return response.status(401).send('Não autorizado!')

                } else {
                    request.user = user as JwtPayload
                    return next()
                }
            })(request, response, next)

        } catch (error) {
            console.log(error)
            return response.status(401).send('Não autorizado!')

        }
    }


}
