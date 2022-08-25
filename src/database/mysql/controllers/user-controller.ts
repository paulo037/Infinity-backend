import { UserRepositoryMysql } from "../model/user-repository";
import { Request, Response } from "express";
import { User } from "../../../domain/entities/user/user";
import { CreateUser, CreateUserRequest } from "../../../application/services/user/create-user";
import { JwtPayload } from "../../../application/config/auth";
import { UpdateUser, UpdateUserRequest } from "../../../application/services/user/update-user";
export class UserController {
    constructor(
        private repository = new UserRepositoryMysql(),
        private createUser = new CreateUser(repository),
        private updateUser = new UpdateUser(repository)

    ) { }

    public create = async (request: Request, response: Response) => {

        const userLog = request.user as JwtPayload

        let user = request.body.user

        if (userLog == undefined) user.admin = false
        else if (userLog.admin == false) user.admin = false

        try {
            await this.createUser.execute(user as CreateUserRequest)
            return response.status(201).send();
        } catch (error) {
            error instanceof Error ? console.log("\n\n", error.message) : console.log("\n\n", error)
            
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }
    
    public getUser = async (request: Request, response: Response) => {

        const userLog = request.user as JwtPayload
      
        if (userLog == undefined) return response.status(401).send();

        try {
            const user = await this.repository.findByEmail(userLog.email);
            response.json(user).status(200);
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }

    }

    public update = async (request: Request, response: Response) => {

        const userLog = request.user as JwtPayload

        let user = request.body.user

        if (userLog == undefined) user.admin = false
        else if (userLog.admin == false) user.admin = false


        try {
            this.updateUser.execute(user as UpdateUserRequest)
            response.status(201).send();
        } catch (error) {
            console.log(error);
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }



    public getAll = async (request: Request, response: Response) => {
        try {
            const users = await this.repository.getAllUsers();
            response.json(users);
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }



    public changeAdminPermission = async (request: Request, response: Response) => {
        let id = request.params.id as unknown as number
        let { admin } = request.body

        const userLog = request.user as JwtPayload

        if (userLog == undefined) response.status(401).send("Usuário não é um administrador !")
        if (userLog.admin == false) response.status(401).send("Usuário não é um administrador !")

        try {
            await this.repository.changeAdminPermission(id, admin)
            response.status(201).send();
        } catch (error) {
            console.log(error);
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }

}