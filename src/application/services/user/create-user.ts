import { Validation } from "../../../domain/validation/validation";
import { User } from "../../../domain/entities/user/user"
import { UserRepository } from "../../repositories/UserRepository";

type CreateUserRequest = {
    first_name: string;
    last_name: string;
    image: string;
    password: string;
    confirmPassword: string;
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
        confirmPassword,
        email,
        cpf,
        admin }: CreateUserRequest) {



        Validation.existOrError(email, "E-mail não informado");
        Validation.validEmailOrError(email, "Email mal formatado");
        Validation.existOrError(first_name, "Primeiro nome não informado");
        Validation.existOrError(last_name, "Ultimo nome não informado");
        Validation.existOrError(password, "Senha não informada");
        Validation.existOrError(confirmPassword, "Confirmação de senha não informada");
        Validation.existOrError(cpf, "CPF não informado");
        Validation.equalsOrError(password, confirmPassword, "Senhas não conferem");

        const userWithEmailExist = await this.userRepository.findByEmail(email);
        Validation.notExistOrError(userWithEmailExist, "Já existe uma conta vinculada há esse email");
       
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

        this.userRepository.create(user)

    }
}