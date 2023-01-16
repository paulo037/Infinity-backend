import { Address } from "../../../domain/entities/user/address";
import { Validation } from "../../../domain/validation/validation";
import { UserRepository } from "../../repositories/UserRepository";

export type CreateAddressRequest = {
  
    complement: string;
    user_name: string;
    state: string;
    city: string;
    district: string;
    street: string;
    cep: number;
    telephone: number;
    number: number;
    user_id: string;
}


export class CreateAddress {

    constructor(
        private userRepository: UserRepository,
    ) { }



    async execute(request : CreateAddressRequest) {

       
        const address = new Address(request);
        return address;
    }
}