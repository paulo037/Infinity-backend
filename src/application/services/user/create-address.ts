import { Address } from "../../../domain/entities/user/address";
import { Validation } from "../../../domain/validation/validation";
import { UserRepository } from "../../repositories/UserRepository";

type CreateAddressRequest = {
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



    async execute({ user_name,
        state,
        city,
        district,
        street,
        cep,
        telephone,
        number,
        user_id, }: CreateAddressRequest) {




        const AddressWithUserIdExist = await this.userRepository.getAddresses(user_id);
        Validation.existOrError(AddressWithUserIdExist, "O usuário para qual o endereço está sendo crido não foi encontrado!");

        const address = Address.create(
            {
                user_name,
                state,
                city,
                district,
                street,
                cep,
                telephone,
                number,
                user_id,
            });

       
        return address;
    }
}