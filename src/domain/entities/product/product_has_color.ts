import { Entity } from "../../../core/domain/entities";

type ProductHasColorProps = {
    size_id: string;
    color_id: string;
    product_id: string;
    quantity: number; 
  
}

export class ProductHasColor extends Entity<ProductHasColorProps>{
    private constructor(props: ProductHasColorProps) {
        super(props);
    }


    static create(props: ProductHasColorProps) {
        const productHasColor = new ProductHasColor(props)

        return productHasColor;
    }
}