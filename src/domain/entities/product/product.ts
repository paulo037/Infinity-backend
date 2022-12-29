import { v4 } from "uuid";
import { Entity } from "../../../core/domain/entities";

type ProductProps = {
    name: string;
    description?: string;
    price: number;
    height?: number;
    width?: number;
    length?: number;
    weight?:number;
    id?: string;
}
export class Product extends Entity<ProductProps>{


    private constructor(props: ProductProps) {
        super(props);
    }

    public get name(): string {
        return this.props.name;
    }

    public get id() {
        return this.props.id;
    }

    public get price() {
        return this.props.price;
    }


    static create(props: ProductProps) {
        props.id = props.id ? props.id : v4()
        const product = new Product(props);

        return product;
    }
}