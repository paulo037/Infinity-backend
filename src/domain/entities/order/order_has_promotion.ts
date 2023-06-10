import { v4 } from "uuid";

export type OrderHasPromotionProps = {
    id?: string,
    order_id: string;
    promotion_id: string;
    price: number;
    quantity: number;
}

export class OrderHasPromotion {
    public id: string;
    public order_id: string;
    public promotion_id: string;
    public quantity: number;
    public price: number;


    constructor(
        { id,
            order_id,
            promotion_id,
            price,
            quantity }: OrderHasPromotionProps
    ) {
        this.id = id ?? v4()
        this.order_id = order_id
        this.promotion_id = promotion_id
        this.quantity = quantity
        this.price = price

    }


}
