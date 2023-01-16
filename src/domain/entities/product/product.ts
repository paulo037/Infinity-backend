import { v4 } from "uuid";

export type ProductProps = {
    name: string;
    id?: string;
    description?: string;
    price: number;
    height?: number;
    width?: number;
    length?: number;
    weight?: number;
}
export class Product {

    public name: string;
    public id: string;
    public price: number;
    public description?: string;
    public height?: number;
    public width?: number;
    public length?: number;
    public weight?: number;
    

    constructor(
        { name,
            id,
            price,
            description,
            height,
            width,
            length,
            weight }: ProductProps
    ) {
        this.name = name
        this.id = id ?? v4()
        this.price = price
        this.description = description
        this.height = height
        this.width = width
        this.length = length
        this.weight = weight
    }
}