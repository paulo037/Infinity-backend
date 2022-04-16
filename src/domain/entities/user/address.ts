import { Entity } from "../../../core/domain/entities";
import { Validation } from "../../validation/validation";

type AddressProps = {
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
export class Address extends Entity<AddressProps>{
    private constructor(props: AddressProps) {
        super(props);
    }


    static create(props: AddressProps) {
        Validation.existOrError(props.name, "Nome do enderesso não foi informado")
        Validation.existOrError(props.cep, " O CEP  não foi informado")
        Validation.existOrError(props.estate, "O estado não foi informado")
        Validation.existOrError(props.city, "A cidade não foi informada")
        Validation.existOrError(props.district, "O bairro não foi informado")
        Validation.existOrError(props.street, "A rua não foi informada")
        Validation.existOrError(props.telephone, "O número de celular não informado")
        Validation.existOrError(props.user_id, "Usuário não informado")
        const address = new Address(props)

        return address;
    }
}