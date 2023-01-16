
export type ProductHasCategoryProps = {
    category_id: string;
    product_id: string;
}

export class ProductHasCategory {
    public category_id: string;
    public product_id: string;

    constructor({category_id, product_id} : ProductHasCategoryProps) {
        this.category_id = category_id
        this.product_id = product_id
    }
}