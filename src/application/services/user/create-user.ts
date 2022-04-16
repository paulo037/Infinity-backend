import { Validation } from "../../../domain/validation/validation";
import { User } from "../../../domain/entities/user/user"
import { UserRepository } from "../../repositories/UserRepository";

type CreateUserRequest = {
    name: string;
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



    async execute({ name,
        image,
        password,
        confirmPassword,
        email,
        cpf,
        admin }: CreateUserRequest) {



        Validation.existOrError(email, "E-mail não informado");
        Validation.validEmailOrError(email, "Email mal formatado");
        Validation.existOrError(name, "Nome não informado");
        Validation.existOrError(password, "Senha não informada");
        Validation.existOrError(confirmPassword, "Confirmação de senha não informada");
        Validation.existOrError(cpf, "CPF não informado");
        Validation.equalsOrError(password, confirmPassword, "Senhas não conferem");

        const userWithEmailExist = await this.userRepository.findByEmail(email);
        Validation.notExistOrError(userWithEmailExist, "Já existe uma conta vinculada há esse email");
       
        const user = User.create(
            {
                name,
                image,
                password,
                email,
                cpf,
                admin
            });

        this.userRepository.create(user)

    }
}