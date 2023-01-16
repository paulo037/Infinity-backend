import { v4 } from "uuid";

export type OrderProps = {
    id?: string;
    price: number;
    shipping_price: number;
    state: string;
    created_at?: Date;
    status: number;
    user_name: string;
    city: string;
    district: string;
    street: string;
    cep: number;
    telephone: number;
    number?: number;
    complement?: string;
    user_id: string;
    tracking_code?: string;
}


export class Order {
    public id: string;
    public price: number;
    public shipping_price: number;
    public state: string;
    public created_at?: Date;
    public status: number;
    public user_name: string;
    public city: string;
    public district: string;
    public street: string;
    public cep: number;
    public telephone: number;
    public number?: number;
    public complement?: string;
    public user_id: string;
    public tracking_code?: string;


    constructor(
        { id,
            price,
            shipping_price,
            state,
            created_at,
            status,
            user_name,
            city,
            district,
            street,
            cep,
            telephone,
            number,
            complement,
            user_id,
            tracking_code }: OrderProps
    ) {
        this.id = id ?? v4()
        this.price = price
        this.shipping_price = shipping_price
        this.state = state
        this.created_at = created_at
        this.status = status
        this.user_name = user_name
        this.city = city
        this.district = district
        this.street = street
        this.cep = cep
        this.telephone = telephone
        this.number = number
        this.complement = complement
        this.user_id = user_id
        this.tracking_code = tracking_code
    }
}