import { v4 } from "uuid";

export type OrderHasProductProps = {
    id?: string,
    order_id: string;
    product_id: string;
    product_name: string;
    product_price: number;
    color: string;
    size: string;
    quantity: number;
    rating?: number;

}
export class OrderHasProduct {
    public id: string;
    public order_id: string;
    public product_id: string;
    public product_name: string;
    public product_price: number;
    public color: string;
    public size: string;
    public quantity: number;
    public rating?: number;

    constructor(
        {id,
        order_id,
        product_id,
        product_name,
        product_price,
        color,
        size,
        quantity,
        rating}: OrderHasProductProps
    ) {
        this.id = id ?? v4()
        this.order_id = order_id
        this.product_id = product_id
        this.product_name = product_name
        this.product_price = product_price
        this.color = color
        this.size = size
        this.quantity = quantity
        this.rating = rating
    }

 
}
