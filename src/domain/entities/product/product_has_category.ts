import { Entity } from "../../../core/domain/entities";

type ProductHasCategoryProps = {
    category_id: number;
    product_id: number; 
}

export class ProductHasCategory extends Entity<ProductHasCategoryProps>{
    private constructor(props: ProductHasCategoryProps) {
        super(props);
    }

    static create(props: ProductHasCategoryProps) {
        const productHasCategory = new ProductHasCategory(props)

        return productHasCategory;
    }
}