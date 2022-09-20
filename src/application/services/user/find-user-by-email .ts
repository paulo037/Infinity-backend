import { Validation } from "../../../domain/validation/validation";
import { User } from "../../../domain/entities/user/user"
import { UserRepository } from "../../repositories/UserRepository";


export class FindUserByEmail {

    constructor(
        private userRepository: UserRepository,
    ) { }



    async execute(email: string) : Promise<User> {



        Validation.existOrError(email, "E-mail não informado");
        Validation.validEmailOrError(email, "Email mal formatado");


        const userWithEmailExist = await this.userRepository.findByEmail(email);
        Validation.existOrError(userWithEmailExist, "Email/Senha Inválidos!");

        if (userWithEmailExist == null) throw new Error("Email/Senha Inválidos!") 

        return userWithEmailExist;
            
    }
}