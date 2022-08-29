import { User } from "../../../domain/entities/user/user"
import { UserRepository } from "../../repositories/UserRepository";


export class GetAllUsers {

    constructor(
        private userRepository: UserRepository,
    ) { }



    async execute() : Promise<User[] | null> {


        const users = await this.userRepository.getAllUsers();


        return users;
            
    }
}