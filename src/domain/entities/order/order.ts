import { Entity } from "../../../core/domain/entities";
import { v4 } from "uuid";

export type OrderProps = {
    id?: string
    price: number;
    shipping_price?: number;
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


export class Order extends Entity<OrderProps>{
    private constructor(props: OrderProps) {
        super(props);
    }


    static create(props: OrderProps) {

        props.id = props.id ? props.id : v4()

        const order = new Order(props)

        return order;
    }
}