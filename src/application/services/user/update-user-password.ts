import { User } from "../../../domain/entities/user/user";
import { Validation } from "../../../domain/validation/validation";
import { UserRepository } from "../../repositories/UserRepository";
import bcrypt from "bcrypt"





export type UpdateUserPasswordRequest = {
    id: string
    new_password: string;
    confirm_new_password: string;
    password: string;
}


export class UpdateUserPassword {

    constructor(
        private userRepository: UserRepository,
    ) { }



    async execute({
        id,
        new_password,
        confirm_new_password,
        password }: UpdateUserPasswordRequest) {

        const user = await this.userRepository.findById(id) as User;

        Validation.existOrError(user, "Usuário não existe!");
        Validation.existOrError(new_password, "Nova senha não informada");
        Validation.existOrError(confirm_new_password, "Confirmação da nova senha não informada");
        Validation.existOrError(password, "Senha atual não informada");
        Validation.equalsOrError(new_password, confirm_new_password, "Senhas não conferem");


        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            throw new Error("Senha atual incorreta!");
        }

        const salt = bcrypt.genSaltSync(10)

        password = bcrypt.hashSync(new_password, salt)

        user.password = password;

        await this.userRepository.update(user);

    }
}

