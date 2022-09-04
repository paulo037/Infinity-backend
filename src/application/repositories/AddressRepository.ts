import { Address } from "../../domain/entities/user/address"


export interface AddressRepository{
    create(address: Address):Promise<null>
    update(address: Address):Promise<null>
    delete(id: string):Promise<null>
    findByUserId(user_id: string): Promise<Address[] | null>
}