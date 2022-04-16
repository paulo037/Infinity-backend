import { Validation } from "../../../domain/validation/validation";
import { UserRepository } from "../../repositories/UserRepository";

type DeleteUserRequest = {
    id: number
}


export class DeleteUser {

    constructor(
        private UserRepository: UserRepository,
    ) { }

    async execute({ id }: DeleteUserRequest) {


        const UserExist = await this.UserRepository.findById(id);
        Validation.existOrError(UserExist, "Produto não encontrado");
      
        return this.UserRepository.delete(id)

        
    }
}