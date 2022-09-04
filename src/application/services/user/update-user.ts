import { User } from "../../../domain/entities/user/user";
import { Validation } from "../../../domain/validation/validation";
import { UserRepository } from "../../repositories/UserRepository";
import bcrypt from "bcrypt"

export type UpdateUserRequest = {
    first_name: string;
    last_name: string;
    id: string;
    image: string;
    password: string;
    confirm_password: string;
    email: string;
    cpf: string;
    admin?: boolean;
}


export class UpdateUser {

    constructor(
        private userRepository: UserRepository,
    ) { }



    async execute({ 
        first_name,
        last_name,
        id,
        image,
        password,
        confirm_password,
        email,
        cpf,
        admin,}: UpdateUserRequest) {

        const user = await this.userRepository.findById(id);

        Validation.existOrError(user, "Usuário não existe!");
        
        Validation.existOrError(email, "E-mail não informado");
        Validation.validEmailOrError(email, "Email mal formatado");
        Validation.existOrError(first_name, "Primeiro nome não informado");
        Validation.existOrError(last_name, "Sobrenome não informado");
        Validation.existOrError(password, "Senha não informada");
        Validation.existOrError(confirm_password, "Confirmação de senha não informada");
        Validation.existOrError(cpf, "CPF não informado");
        Validation.equalsOrError(password, confirm_password, "Senhas não conferem");

        const salt = bcrypt.genSaltSync(10)

        password = bcrypt.hashSync(password, salt)

        const userUpdate = User.create({
            first_name,
            last_name,
            image,
            password,
            email,
            cpf,
            admin,
            id
        });

        await this.userRepository.update(userUpdate);

    }
}