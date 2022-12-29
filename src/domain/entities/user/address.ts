import { v4 } from "uuid";
import { Entity } from "../../../core/domain/entities";
import { Validation } from "../../validation/validation";

export type AddressProps = {
    user_name: string;
    state: string;
    city: string;
    district: string;
    street: string;
    complement: string;
    cep: number;
    telephone: number;
    number: number;
    user_id: string;
    id?: string;

}
export class Address extends Entity<AddressProps>{
    private constructor(props: AddressProps) {
        super(props);
    }


    static create(props: AddressProps) {
        Validation.existOrError(props.user_name, "Nome do endereço não foi informado")
        Validation.existOrError(props.cep, " O CEP  não foi informado")
        Validation.existOrError(props.state, "O estado não foi informado")
        Validation.existOrError(props.city, "A cidade não foi informada")
        Validation.existOrError(props.district, "O bairro não foi informado")
        Validation.existOrError(props.street, "A rua não foi informada")
        Validation.existOrError(props.telephone, "O número de celular não informado")
        Validation.existOrError(props.user_id, "Usuário não informado")

        props.id = props.id ? props.id : v4()

        const address = new Address(props)

        return address;
    }
}