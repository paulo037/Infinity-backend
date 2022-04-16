import { Entity } from "../../../core/domain/entities";

type CategoryProps = {
    name: string;
    image:string;
}

export class Category extends Entity<CategoryProps>{
    private constructor(props: CategoryProps, id?: number) {
        super(props, id);
    }

    public get name() : string {
        return this.props.name;
    }

    static create(props: CategoryProps, id?: number){
        const category = new Category(props, id);

        return category;
    }
}