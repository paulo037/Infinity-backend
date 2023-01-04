import { UserRepositoryMysql } from "../model/user-repository";
import { Request, Response } from "express";
import { CreateUser, CreateUserRequest } from "../../../application/services/user/create-user";
import { JwtPayload } from "../../../application/config/auth";
import { UpdateUser, UpdateUserRequest } from "../../../application/services/user/update-user";
import { FindUserByEmail } from "../../../application/services/user/find-user-by-email ";
import { GetAllUsers } from "../../../application/services/user/get-all-users";
import { ChangeAdminPermission } from "../../../application/services/user/change-admin-permission";
import { Address } from "../../../domain/entities/user/address";
import { Entity } from "../../../core/domain/entities";
import { logger } from "../../../logger";
import { UpdateUserPassword, UpdateUserPasswordRequest } from "../../../application/services/user/update-user -password";
import { Mailer } from "../../../application/config/nodemailer";
import { UpdatePassword } from "../../../application/services/user/update-password";
export class UserController {


    constructor(
        private repository = new UserRepositoryMysql(),
        private createUser = new CreateUser(repository),
        private updateUser = new UpdateUser(repository),
        private updatePasswordService = new UpdatePassword(repository),
        private updateUserPassword = new UpdateUserPassword(repository),
        private findByEmail = new FindUserByEmail(repository),
        private getAllUsers = new GetAllUsers(repository),
        private changeUserPermission = new ChangeAdminPermission(repository),
    ) { }

    public create = async (request: Request, response: Response) => {

        try {
            let user = request.body.user

            await this.createUser.execute(user as CreateUserRequest)
            return response.status(201).send();
        } catch (error) {

            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }

    public getUser = async (request: Request, response: Response) => {

        type UserResponse = {
            first_name: string;
            last_name: string;
            image?: string;
            email: string;
            cpf: string;
        }

        try {
            const userLog = request.user as JwtPayload

            if (userLog == undefined) return response.status(401).send();

            const user = await this.findByEmail.execute(userLog.email);
            let userResponse = {} as UserResponse

            userResponse.first_name = user.props.first_name
            userResponse.last_name = user.props.last_name
            userResponse.image = user.props.image
            userResponse.email = user.props.email
            userResponse.cpf = user.props.cpf

            
            
            return response.json(userResponse).status(200);
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }

    }

    public update = async (request: Request, response: Response) => {

        try {
            const userLog = request.user as JwtPayload
            if (userLog == undefined) return response.status(401).send();

            let user = request.body.user as UpdateUserRequest

            user.id = userLog.id


            await this.updateUser.execute(user)
            return response.status(201).send();
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }

    public updatePassword = async (request: Request, response: Response) => {

        try {
            const userLog = request.user as JwtPayload
            if (userLog == undefined) return response.status(401).send();

            let props = request.body.props as UpdateUserPasswordRequest

            props.id = userLog.id


            await this.updateUserPassword.execute(props)
            return response.status(201).send();
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }

    public passwordRecovery = async (request: Request, response: Response) => {

        try {
           

            let email = request.body.email as string;

            const user = await this.findByEmail.execute(email);
    
            const haveRecovery = await this.repository.findPasswordRecovery(user.id as string);
            if (haveRecovery) throw new Error('Já há um link de redefinição de senha ativo! O link tem duração de 15 minutos.')


            const id = await this.repository.passwordRecovery(user.id as string);
            await Mailer.passwordRecovery({
                first_name: user.props.first_name,
                id,
                to: user.email
            })
            return response.status(200).send();
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }


    public passwordRecoveryExist = async (request: Request, response: Response) => {

        try {

            const id = request.params.id as string;
    
            const recovery = await this.repository.passwordRecoveryExist(id);
        
            return response.status(200).json(recovery);
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }


    public UpdatePassword = async (request: Request, response: Response) => {

        try {

            const id = request.params.id as string;
            const user = request.body.user;
    
            await this.updatePasswordService.execute({recovery_id: id, password: user.password, confirm_password : user.confirm_password});
        
            return response.status(200).send();
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }
    

    


    

    public getAll = async (request: Request, response: Response) => {
        try {
            const users = await this.getAllUsers.execute();
            return response.json(users);
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }



    public changeAdminPermission = async (request: Request, response: Response) => {
        let id = request.params.id
        let { admin } = request.body
        const userLog = request.user as JwtPayload

        if (userLog == undefined) return response.status(401).send("Usuário não é um administrador!")
        if (userLog.ad == false) return response.status(401).send("Usuário não é um administrador!")

        try {
            await this.changeUserPermission.execute(id, admin)
            return response.status(201).send();
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }


    public getAddresses = async (request: Request, response: Response) => {

        const userLog = request.user as JwtPayload

        if (userLog == undefined) return response.status(401).send("Usuário não autorizado!")


        try {
            const address = await this.repository.getAddresses(userLog.id);
            return response.json(address).status(200);
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");

        }
    }

    public createAddress = async (request: Request, response: Response) => {

        try {
            const userLog = request.user as JwtPayload

            if (userLog == undefined) return response.status(401).send("Usuário não autorizado!")
            let addressProps = request.body.address
            addressProps.user_id = userLog.id
            const address = Address.create(addressProps)

            if (userLog.id != address.props.user_id) return response.status(401).send("Usuário não autorizado!")

            await this.repository.createAddress(address);
            return response.status(200).send("Endereço atualizado com sucesso!");
        } catch (error) {
            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");

        }
    }

    public updateAddress = async (request: Request, response: Response) => {

        try {
            const userLog = request.user as JwtPayload

            if (userLog == undefined) return response.status(401).send("Usuário não autorizado!")

            const address = Address.create(request.body.address)

            if (userLog.id != address.props.user_id) return response.status(401).send("Usuário não autorizado!")

            await this.repository.updateAddress(address);
            return response.status(200).send("Endereço atualizado com sucesso!");
        } catch (error) {
            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");

        }
    }


    public getAddress = async (request: Request, response: Response) => {

        const userLog = request.user as JwtPayload

        if (userLog == undefined) return response.status(401).send("Usuário não autorizado!")

        const id = request.params.id

        try {
            const address = await this.repository.getAddress(id, userLog.id);
            return response.json(address).status(200);
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");

        }
    }



}