import { Address } from "../../domain/entities/user/address"
import { User } from "../../domain/entities/user/user"

export interface UserRepository{
    create(user: User):Promise<null>
    update(user: User):Promise<null>
    delete(id: string):Promise<null>
    findById(id: string): Promise<User | null>
    findByEmail(email: string): Promise<User | null>
    findByCPF(cpf: string): Promise<User | null>
    getAllUsers():Promise<User[]>
    changeAdminPermission(id: string, adminPermission: Boolean):Promise<null>
    getAddresses(user_id: string): Promise<Address[]>
    getAddress(id:string, user_id: string): Promise<Address>
}