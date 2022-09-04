import { Validation } from "../../../domain/validation/validation";
import { UserRepository } from "../../repositories/UserRepository";




export class ChangeAdminPermission {

    constructor(
        private userRepository: UserRepository,
    ) { }



    async execute(id : string, admin : boolean) {

        Validation.existOrError(id, "Usuário não informado!");
        Validation.existOrError(admin, "Permissão de usuário não informada!");
  
        const userWithEmailExist = await this.userRepository.findById(id)
        Validation.existOrError(userWithEmailExist, "Usuário informado não existe!");


        await this.userRepository.changeAdminPermission(id, admin)
            
    }
}