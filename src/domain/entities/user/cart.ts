export type CartProps = {
    user_id: string;
    product_id: string;
    size_id: string;
    color_id: string;
    quantity: number;
}

export class Cart {

    public user_id: string;
    public product_id: string;
    public size_id: string;
    public color_id: string;
    public quantity: number;

    constructor(
        {
            user_id,
            product_id,
            size_id,
            color_id,
            quantity }: CartProps
    ) {
        this.user_id = user_id
        this.product_id = product_id
        this.size_id = size_id
        this.color_id = color_id
        this.quantity = quantity
    }

}