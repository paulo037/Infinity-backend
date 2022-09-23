import { UserRepositoryMysql } from "../model/user-repository";
import { Request, Response } from "express";
import { User } from "../../../domain/entities/user/user";
import { CreateUser, CreateUserRequest } from "../../../application/services/user/create-user";
import { JwtPayload } from "../../../application/config/auth";
import { UpdateUser, UpdateUserRequest } from "../../../application/services/user/update-user";
import { FindUserByEmail } from "../../../application/services/user/find-user-by-email ";
import { GetAllUsers } from "../../../application/services/user/get-all-users";
import { ChangeAdminPermission } from "../../../application/services/user/change-admin-permission";
export class UserController {
    constructor(
        private repository = new UserRepositoryMysql(),
        private createUser = new CreateUser(repository),
        private updateUser = new UpdateUser(repository),
        private findByEmail = new FindUserByEmail(repository),
        private getAllUsers = new GetAllUsers(repository),
        private changeUserPermission = new ChangeAdminPermission(repository),
    ) { }

    public create = async (request: Request, response: Response) => {

        try {
            const userLog = request.user as JwtPayload

            let user = request.body.user

            if (userLog == undefined) user.ad = false
            else if (userLog.ad == false) user.ad = false

            await this.createUser.execute(user as CreateUserRequest)
            return response.status(201).send();
        } catch (error) {

            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }

    public getUser = async (request: Request, response: Response) => {

        try {
            const userLog = request.user as JwtPayload

            if (userLog == undefined) return response.status(401).send();

            const user = await this.findByEmail.execute(userLog.email);
            response.json(user ? { ...user.props } : null).status(200);
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }

    }

    public update = async (request: Request, response: Response) => {

        try {
            const userLog = request.user as JwtPayload

            let user = request.body.user as UpdateUserRequest

            if (userLog == undefined) user.admin = false
            else if (userLog.ad == false) user.admin = false


            this.updateUser.execute(user)
            response.status(201).send();
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }



    public getAll = async (request: Request, response: Response) => {
        try {
            const users = await this.getAllUsers.execute();
            response.json(users);
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }



    public changeAdminPermission = async (request: Request, response: Response) => {
        let id = request.params.id
        let { admin } = request.body

        const userLog = request.user as JwtPayload

        if (userLog == undefined) response.status(401).send("Usuário não é um administrador!")
        if (userLog.ad == false) response.status(401).send("Usuário não é um administrador!")

        try {
            await this.changeUserPermission.execute(id, admin)
            response.status(201).send();
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }


    public getAdresses = async (request: Request, response: Response) => {

        const userLog = request.user as JwtPayload

        if (userLog == undefined) response.status(401).send("Sem permissão!")


        try {
            const address = await this.repository.getAddresses(userLog.id);
            response.json(address).status(200);
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");

        }
    }


    public getAdress = async (request: Request, response: Response) => {

        const userLog = request.user as JwtPayload

        if (userLog == undefined) response.status(401).send("Sem permissão!")

        const id = request.params.id

        try {
            const address = await this.repository.getAddress(id, userLog.id);
            response.json(address).status(200);
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");

        }
    }

}