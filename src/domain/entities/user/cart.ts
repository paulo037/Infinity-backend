import { Entity } from "../../../core/domain/entities";

export type CartProps = {
    user_id: string;
    product_id: string; 
    size_id : string; 
    color_id : string; 
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