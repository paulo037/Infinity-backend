import { Entity } from "../../../core/domain/entities";

type OrderProps = {
    price: number;
    estate: string;
    date: Date;
    status: number;
    address_name: string;
    city: string;
    district: string;
    street: string;
    cep: number;
    telephone: number;
    address_number: number;
    user_id: number;
}
export class Order extends Entity<OrderProps>{
    private constructor(props: OrderProps) {
        super(props);
    }


    static create(props: OrderProps) {
        const order = new Order(props)

        return order;
    }
}