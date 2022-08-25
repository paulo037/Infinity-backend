import { Address } from "../../../domain/entities/user/address";
import { Validation } from "../../../domain/validation/validation";
import { AddressRepository } from "../../repositories/AddressRepository";

type CreateAddressRequest = {
    name: string;
    estate: string;
    city: string;
    district: string;
    street: string;
    cep: number;
    telephone: number;
    number: number;
    user_id: number;
}


export class CreateAddress {

    constructor(
        private AddressRepository: AddressRepository,
    ) { }



    async execute({ name,
        estate,
        city,
        district,
        street,
        cep,
        telephone,
        number,
        user_id, }: CreateAddressRequest) {




        const AddressWithUserIdExist = await this.AddressRepository.findByUserId(user_id);
        Validation.notExistOrError(AddressWithUserIdExist, "O usuário para qual o endereço está sendo crido não foi encontrado");

        const address = Address.create(
            {
                name,
                estate,
                city,
                district,
                street,
                cep,
                telephone,
                number,
                user_id,
            });

        await this.AddressRepository.create(address)

    }
}