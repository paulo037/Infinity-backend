import { Validation } from "../../../domain/validation/validation";
import { User } from "../../../domain/entities/user/user"
import { UserRepository } from "../../repositories/UserRepository";
import bcrypt from "bcrypt"

export type CreateUserRequest = {
    first_name: string;
    last_name: string;
    image: string;
    password: string;
    confirm_password: string;
    email: string;
    cpf: string;
    admin?: boolean;
}


export class CreateUser {

    constructor(
        private userRepository: UserRepository,
    ) { }



    async execute({ first_name,
        last_name,
        image,
        password,
        confirm_password,
        email,
        cpf,
        admin }: CreateUserRequest) {

        cpf = cpf.replace(/[^0-9]/g, "");

        Validation.existOrError(email, "E-mail não informado");
        Validation.validEmailOrError(email, "Email mal formatado");
        Validation.existOrError(first_name, "Primeiro nome não informado");
        Validation.existOrError(last_name, "Sobrenome não informado");
        Validation.existOrError(password, "Senha não informada");
        Validation.existOrError(confirm_password, "Confirmação de senha não informada");
        Validation.existOrError(cpf, "CPF não informado");
        Validation.equalsOrError(password, confirm_password, "Senhas não conferem");
        Validation.validCPFOrError(cpf);
        const userWithEmailExist = await this.userRepository.findByEmail(email);
        Validation.notExistOrError(userWithEmailExist, "Já existe uma conta vinculada há esse email");

        const userWithCPFExist = await this.userRepository.findByCPF(cpf);
        Validation.notExistOrError(userWithCPFExist, "Já existe uma conta vinculada há esse CPF");

        const salt = bcrypt.genSaltSync(10)

        password = bcrypt.hashSync(password, salt)

        const user = User.create(
            {
                first_name,
                last_name,
                image,
                password,
                email,
                cpf,
                admin
            });

            
        await this.userRepository.create(user)
            
    }
}