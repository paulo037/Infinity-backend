import { Entity } from "../../../core/domain/entities";

type ProductProps = {
    name: string;
    description?: string;
    price: number;
    height?: number;
    width?: number;
    length?: number;
    id?: number;
}
export class Product extends Entity<ProductProps>{

    
    private constructor(props: ProductProps) {
        super(props);
    }
    
    public get name() : string {
        return this.props.name;
    }

    public get id() {
        return this.props.id;
    }


    static create(props: ProductProps) {
        const product = new Product(props);

        return product;
    }
}