import { Entity } from "../../../core/domain/entities";
import { v4 } from "uuid";

export type OrderHasProductProps = {
    id?:string,
    order_id?: string;
    product_id: string; 
    product_name: string; 
    product_price: number; 
    color: string; 
    size: string; 
    rating?: number; 
    quantity: number; 
  
}
export class OrderHasProduct extends Entity<OrderHasProductProps>{
    private constructor(props: OrderHasProductProps) {
        super(props);
    }


    static create(props: OrderHasProductProps) {

        props.id = props.id ?  props.id : v4()
        const orderHasProduct = new OrderHasProduct(props)

        return orderHasProduct;
    }
}
