import { Entity } from "../../../core/domain/entities";

type SaleHasProductProps = {
    sale_id: number;
    product_id: number; 
    rating : number; 
    quantity: number; 
  
}
class SaleHasProduct extends Entity<SaleHasProductProps>{
    private constructor(props: SaleHasProductProps) {
        super(props);
    }


    static create(props: SaleHasProductProps) {
        const saleHasProduct = new SaleHasProduct(props)

        return saleHasProduct;
    }
}