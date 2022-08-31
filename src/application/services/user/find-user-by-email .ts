import { Validation } from "../../../domain/validation/validation";
import { User } from "../../../domain/entities/user/user"
import { UserRepository } from "../../repositories/UserRepository";


export class FindUserByEmail {

    constructor(
        private userRepository: UserRepository,
    ) { }



    async execute(email: string) : Promise<User | null> {



        Validation.existOrError(email, "E-mail não informado");
        Validation.validEmailOrError(email, "Email mal formatado");


        const userWithEmailExist = await this.userRepository.findByEmail(email);
        Validation.existOrError(userWithEmailExist, "Não existe uma conta vinculada há esse email");


        return userWithEmailExist;
            
    }
}