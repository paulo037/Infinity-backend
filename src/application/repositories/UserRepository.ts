import { Address } from "../../domain/entities/user/address"
import { User } from "../../domain/entities/user/user"

export interface UserRepository{
    create(user: User):Promise<null>
    createAddress(address: Address): Promise<null>
    update(user: User):Promise<null>
    updatePassword(recovery_id: string, password: string): Promise<null> 
    updateAddress(address: Address): Promise<null>
    changeAdminPermission(id: string, adminPermission: Boolean):Promise<null>
    delete(id: string):Promise<null>
    deleteRecovery(recovery_id: string): Promise<null> 
    findById(id: string): Promise<User | undefined>
    passwordRecovery(id: string): Promise<string>
    findPasswordRecovery(user_id: string): Promise<Boolean>
    passwordRecoveryExist(id: string): Promise<Boolean> 
    findByEmail(email: string): Promise<User | undefined>
    findByCPF(cpf: string): Promise<User | undefined>
    getAllUsers(page: number, limit: number): Promise<User[]> 
    getAddresses(user_id: string): Promise<Address[]>
    getAddress(id:string, user_id: string): Promise<Address>
    getLenght(): Promise<number> 
    exist(id: string): Promise<Boolean>
}