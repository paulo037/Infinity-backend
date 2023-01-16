import { v4 } from "uuid";

export type AddressProps = {
    id?: string;
    user_id: string;
    user_name: string;
    state: string;
    city: string;
    district: string;
    street: string;
    complement: string;
    cep: number;
    telephone: number;
    number?: number;

}
export class Address {
    public id: string;
    public user_id: string;
    public user_name: string;
    public state: string;
    public city: string;
    public district: string;
    public street: string;
    public complement: string;
    public cep: number;
    public telephone: number;
    public number?: number;


    constructor(
        {
            id,
            user_id,
            user_name,
            state,
            city,
            district,
            street,
            complement,
            cep,
            telephone,
            number }: AddressProps
    ) {
        this.id = id ?? v4()
        this.user_id = user_id
        this.user_name = user_name
        this.state = state
        this.city = city
        this.district = district
        this.street = street
        this.complement = complement
        this.cep = cep
        this.telephone = telephone
        this.number = number
    }
}