import { v4 } from "uuid";

type CategoryProps = {
    name: string;
    image: string;
    id?: string;
}

export class Category{

    public name: string;
    public image: string;
    public id: string;
    
    
    constructor({name, image, id}: CategoryProps) {
        this.name = name
        this.image = image
        this.id = id ?? v4()
    } 
}