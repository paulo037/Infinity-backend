import { Entity } from "../../../core/domain/entities";

type CategoryProps = {
    name: string;
    image:string;
    id?: number;
}

export class Category extends Entity<CategoryProps>{
    private constructor(props: CategoryProps) {
        super(props);
    }

    public get name() : string {
        return this.props.name;
    }

    public get id() : number| undefined {
        return this.props.id;
    }

    static create(props: CategoryProps){
        const category = new Category(props);
        return category;
    }
}