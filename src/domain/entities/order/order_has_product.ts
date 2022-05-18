import { Entity } from "../../../core/domain/entities";

type OrderHasProductProps = {
    order_id: number;
    product_id: number; 
    rating : number; 
    quantity: number; 
  
}
export class OrderHasProduct extends Entity<OrderHasProductProps>{
    private constructor(props: OrderHasProductProps) {
        super(props);
    }


    static create(props: OrderHasProductProps) {
        const orderHasProduct = new OrderHasProduct(props)

        return orderHasProduct;
    }
}