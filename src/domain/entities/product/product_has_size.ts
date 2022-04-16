import { Entity } from "../../../core/domain/entities";

type ProductHasSizeProps = {
    size_id: number;
    product_id: number;
    quantity: number; 
  
}

export class ProductHasSize extends Entity<ProductHasSizeProps>{
    private constructor(props: ProductHasSizeProps) {
        super(props);
    }


    static create(props: ProductHasSizeProps) {
        const productHasSize = new ProductHasSize(props)

        return productHasSize;
    }
}