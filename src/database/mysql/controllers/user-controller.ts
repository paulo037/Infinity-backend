import { UserRepositoryMysql } from "../model/user-repository";
import { Request, Response } from "express";
import { CreateUser, CreateUserRequest } from "../../../application/services/user/create-user";
import { JwtPayload } from "../../../application/config/auth";
import { UpdateUser, UpdateUserRequest } from "../../../application/services/user/update-user";
import { FindUserByEmail } from "../../../application/services/user/find-user-by-email ";
import { GetAllUsers } from "../../../application/services/user/get-all-users";
import { ChangeAdminPermission } from "../../../application/services/user/change-admin-permission";
import { Address } from "../../../domain/entities/user/address";
import { UpdateUserPassword, UpdateUserPasswordRequest } from "../../../application/services/user/update-user -password";
import { Mailer, SendWelcomeRequest } from "../../../application/config/nodemailer";
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
            let user = request.body.user as CreateUserRequest

            await this.createUser.execute(user)
            Mailer.welcome({ first_name: user.first_name, to: user.email } as SendWelcomeRequest)
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

            if (userLog == undefined) return response.status(401).send("Não autorizado!");

            const user = await this.findByEmail.execute(userLog.email);
            let userResponse = {} as UserResponse

            userResponse.first_name = user.first_name
            userResponse.last_name = user.last_name
            userResponse.image = user.image
            userResponse.email = user.email
            userResponse.cpf = user.cpf



            return response.json(userResponse).status(200);
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }

    }

    public update = async (request: Request, response: Response) => {

        try {
            const userLog = request.user as JwtPayload
            if (userLog == undefined) return response.status(401).send("Não autorizado!");

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
            if (userLog == undefined) return response.status(401).send("Não autorizado!");

            let props = request.body as UpdateUserPasswordRequest

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
                first_name: user.first_name,
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

            await this.updatePasswordService.execute({ recovery_id: id, password: user.password, confirm_password: user.confirm_password });

            return response.status(200).send();
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }



    public getAll = async (request: Request, response: Response) => {
        try {
            const limit = request.query.limit as unknown as number;
            const page = request.query.page as unknown as number;
            return response.json(await this.getAllUsers.execute({ page, limit }) );
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }



    public changeAdminPermission = async (request: Request, response: Response) => {
        let id = request.params.id
        let { admin } = request.body
        const userLog = request.user as JwtPayload

        if (userLog == undefined) return response.status(401).send("Não autorizado!")
        if (userLog.ad == false) return response.status(401).send("Não autorizado!")

        try {
            await this.changeUserPermission.execute(id, admin)
            return response.status(201).send();
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }


    public getAddresses = async (request: Request, response: Response) => {

        const userLog = request.user as JwtPayload

        if (userLog == undefined) return response.status(401).send("Não autorizado!")


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

            if (userLog == undefined) return response.status(401).send("Não autorizado!")
            let addressProps = request.body.address
            addressProps.user_id = userLog.id
            const address = new Address(addressProps)

            if (userLog.id != address.user_id) return response.status(401).send("Não autorizado!")

            await this.repository.createAddress(address);
            return response.status(200).send("Endereço criado com sucesso!");
        } catch (error) {
            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");

        }
    }

    public updateAddress = async (request: Request, response: Response) => {

        try {
            const userLog = request.user as JwtPayload

            if (userLog == undefined) return response.status(401).send("Não autorizado!")

            const address = new Address(request.body.address)

            if (userLog.id != address.user_id) return response.status(401).send("Não autorizado!")

            await this.repository.updateAddress(address);
            return response.status(200).send("Endereço atualizado com sucesso!");
        } catch (error) {
            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");

        }
    }


    public getAddress = async (request: Request, response: Response) => {

        const userLog = request.user as JwtPayload

        if (userLog == undefined) return response.status(401).send("Não autorizado!")

        const id = request.params.id

        try {
            const address = await this.repository.getAddress(id, userLog.id);
            return response.json(address).status(200);
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");

        }
    }



}