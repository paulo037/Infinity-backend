import { Entity } from "../../../core/domain/entities";

type ProductProps = {
    name: string;
    description?: string;
    price: number;
    height?: number;
    width?: number;
    length?: number;
}
export class Product extends Entity<ProductProps>{

    
    private constructor(props: ProductProps, id?: number) {
        super(props, id);
    }
    
    public get name() : string {
        return this.props.name;
    }

    public get id() {
        return this._id;
    }


    static create(props: ProductProps, id?: number) {
        const product = new Product(props, id);

        return product;
    }
}