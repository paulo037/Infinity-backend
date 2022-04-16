import { User } from "../../../domain/entities/user/user";
import { Validation } from "../../../domain/validation/validation";
import { UserRepository } from "../../repositories/UserRepository";

type UpdateUserRequest = {
    name: string;
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
        name,
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
        Validation.existOrError(name, "Nome não informado");
        Validation.existOrError(password, "Senha não informada");
        Validation.existOrError(confirmPassword, "Confirmação de senha não informada");
        Validation.existOrError(cpf, "CPF não informado");
        Validation.equalsOrError(password, confirmPassword, "Senhas não conferem");


        const userUpdate = User.create({
            name,
            image,
            password,
            email,
            cpf,
            admin,
        },id);

        this.userRepository.update(userUpdate);

    }
}