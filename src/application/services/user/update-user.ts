import { User } from "../../../domain/entities/user/user";
import { Validation } from "../../../domain/validation/validation";
import { UserRepository } from "../../repositories/UserRepository";

type UpdateUserRequest = {
    first_name: string;
    last_name: string;
    id: number;
    image: string;
    password: string;
    confirmPassword: string;
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
        confirmPassword,
        email,
        cpf,
        admin,}: UpdateUserRequest) {

        const user = await this.userRepository.findById(id);

        Validation.existOrError(user, "Produto não encontrado.");
        
        Validation.existOrError(email, "E-mail não informado");
        Validation.validEmailOrError(email, "Email mal formatado");
        Validation.existOrError(first_name, "Primeiro nome não informado");
        Validation.existOrError(last_name, "Ultimo nome não informado");
        Validation.existOrError(password, "Senha não informada");
        Validation.existOrError(confirmPassword, "Confirmação de senha não informada");
        Validation.existOrError(cpf, "CPF não informado");
        Validation.equalsOrError(password, confirmPassword, "Senhas não conferem");


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

        this.userRepository.update(userUpdate);

    }
}