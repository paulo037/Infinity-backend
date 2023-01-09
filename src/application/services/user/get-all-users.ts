import { User } from "../../../domain/entities/user/user"
import { UserRepository } from "../../repositories/UserRepository";

export type GetAllUsersRequest = {
    page: number,
    limit: number
}

export type GetAllUsersResponse = {
    users: User[],
    count: number
}
export class GetAllUsers {

    constructor(
        private userRepository: UserRepository,
    ) { }



    async execute({ page, limit }: GetAllUsersRequest): Promise<GetAllUsersResponse | null> {
        const users = await this.userRepository.getAllUsers(page, limit);
        const count = await this.userRepository.getLenght();
        return {users, count};

    }
}