import { NextFunction, Request, Response } from "express"
import passport from "passport"
import { Strategy, ExtractJwt } from "passport-jwt"
import { send } from "process"
import { UserRepositoryMysql } from "../../database/mysql/model/user-repository"
import { JwtPayload } from "./auth"

const dotenv = require('dotenv')
dotenv.config()


const AUTH_SECRET = process.env.AUTH_SECRET




const repository = new UserRepositoryMysql()

const params = {
    secretOrKey: AUTH_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}



passport.use( new Strategy(params, async function (payload, done){
    const user = await repository.findById(payload.id)
    
    if(user){
        return done (undefined, {...payload})
    }else{
        return done(undefined, false)
    }

}));


export class Passport {
    public authenticate(request: Request, response: Response, next: NextFunction) {

      passport.authenticate('jwt', function (err, user, info) {
        if (err) {
          return response.status(401).send('unauthorized')
        }
        if (!user) {
          return response.status(401).send('unauthorized')
        } else {
            request.user = user as JwtPayload
          return next()
        }
      })(request, response, next)
    }


}

