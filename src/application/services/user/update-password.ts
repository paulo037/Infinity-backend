import { Validation } from "../../../domain/validation/validation";
import { UserRepository } from "../../repositories/UserRepository";
import bcrypt from "bcrypt"


export type UpdatePasswordRequest = {
    password: string;
    confirm_password: string;
    recovery_id: string;
}



export class UpdatePassword {

    constructor(
        private userRepository: UserRepository,
    ) { }



    async execute({
        password,
        confirm_password,
        recovery_id }: UpdatePasswordRequest): Promise<void> {

        const recovery = await this.userRepository.passwordRecoveryExist(recovery_id);

        if (!recovery) throw new Error("Link de redefinição invalido!");

        Validation.existOrError(password, "Senha não informada");
        Validation.existOrError(confirm_password, "Confirmação de senha não informada");
        Validation.equalsOrError(password, confirm_password, "Senhas não conferem");

        const salt = bcrypt.genSaltSync(10)

        password = bcrypt.hashSync(password, salt)


        await this.userRepository.updatePassword(recovery_id, password);
        await this.userRepository.deleteRecovery(recovery_id);

    }
}

