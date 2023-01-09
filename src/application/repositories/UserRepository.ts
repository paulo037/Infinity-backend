import { Address } from "../../domain/entities/user/address"
import { User } from "../../domain/entities/user/user"

export interface UserRepository{
    create(user: User):Promise<null>
    update(user: User):Promise<null>
    delete(id: string):Promise<null>
    findById(id: string): Promise<User | null>
    passwordRecovery(id: string): Promise<string>
    findPasswordRecovery(user_id: string): Promise<Boolean>
    passwordRecoveryExist(id: string): Promise<Boolean> 
    updatePassword(recovery_id: string, password: string): Promise<null> 
    deleteRecovery(recovery_id: string): Promise<null> 
    findByEmail(email: string): Promise<User | null>
    findByCPF(cpf: string): Promise<User | null>
    getAllUsers(page: number, limit: number,): Promise<User[]> 
    changeAdminPermission(id: string, adminPermission: Boolean):Promise<null>
    getAddresses(user_id: string): Promise<Address[]>
    getAddress(id:string, user_id: string): Promise<Address>
    createAddress(address: Address): Promise<null>
    updateAddress(address: Address): Promise<null>
    getLenght(): Promise<number> 
}