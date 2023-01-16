
type ProductHasColorProps = {
    size_id: string;
    color_id: string;
    product_id: string;
    quantity: number;

}

export class ProductHasColor {
    public size_id: string;
    public color_id: string;
    public product_id: string;
    public quantity: number;

    constructor(
        { size_id,
            color_id,
            product_id,
            quantity }: ProductHasColorProps
    ) {
        this.size_id = size_id
        this.color_id = color_id
        this.product_id = product_id
        this.quantity = quantity
    }
}