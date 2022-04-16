import { User } from "../../domain/entities/user/user"

export interface UserRepository{
    create(user: User):Promise<null>
    update(user: User):Promise<null>
    delete(id: number):Promise<null>
    findById(id: number): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    getAllUsers():Promise<User[]>
}