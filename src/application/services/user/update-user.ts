import { User } from "../../../domain/entities/user/user";
import { Validation } from "../../../domain/validation/validation";
import { UserRepository } from "../../repositories/UserRepository";



export type UpdateUserRequest = {
    first_name: string;
    last_name: string;
    id: string;
    email: string;
    cpf: string;
    image?: string;
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
        email,
        cpf, }: UpdateUserRequest) {

        const user = await this.userRepository.findById(id) as User;

        Validation.existOrError(user, "Usuário não existe!");

        Validation.existOrError(email, "E-mail não informado");
        Validation.validEmailOrError(email, "Email mal formatado");
        Validation.existOrError(first_name, "Primeiro nome não informado");
        Validation.existOrError(last_name, "Sobrenome não informado");
        Validation.existOrError(cpf, "CPF não informado");
        Validation.validCPFOrError(cpf);

        const userWithEmailExist = await this.userRepository.findByEmail(email) as User;
        const userWithCPFExist = await this.userRepository.findByCPF(cpf) as User;

        try {
            Validation.notExistOrError(userWithEmailExist, "Já existe uma conta vinculada há esse email");
        } catch (error) {
            Validation.equalsOrError(user.id, userWithEmailExist.id, "Já existe uma conta vinculada há esse email")
        }

        try {
            Validation.notExistOrError(userWithCPFExist, "Já existe uma conta vinculada há esse CPF");
        } catch (error) {
            Validation.equalsOrError(user.id, userWithCPFExist.id, "Já existe uma conta vinculada há esse email")
        }



        const userUpdate = new User({
            first_name,
            last_name,
            id,
            image,
            email,
            cpf,
            password: user.password
        })


        await this.userRepository.update(userUpdate);

    }
}

