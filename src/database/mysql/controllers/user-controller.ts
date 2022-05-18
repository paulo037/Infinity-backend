import { UserRepositoryMysql } from "../model/user-repository";
import { Request, Response } from "express";
export class UserController {
    constructor(
        private repository = new UserRepositoryMysql(),

        

    ) { }

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
        let {admin} = request.body
        console.log('id:', id)
        try {
            await this.repository.changeAdminPermission(id, admin)
            response.status(201).send();
        } catch (error) {
            console.log(error);
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }
    
}

