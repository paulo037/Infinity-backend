import { Entity } from "../../../core/domain/entities";

export type CartProps = {
    user_id: number;
    product_id: number; 
    size_id : number; 
    color_id : number; 
    quantity: number; 
}
export class Cart extends Entity<CartProps>{
    private constructor(props: CartProps) {
        super(props);
    }


    static create(props: CartProps) {
        const cart = new Cart(props)

        return cart;
    }
}