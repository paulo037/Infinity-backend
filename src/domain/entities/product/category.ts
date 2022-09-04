import { v4 } from "uuid";
import { Entity } from "../../../core/domain/entities";

type CategoryProps = {
    name: string;
    image: string;
    id?: string;
}

export class Category extends Entity<CategoryProps>{
    private constructor(props: CategoryProps) {
        super(props);
    }

    public get name(): string {
        return this.props.name;
    }

    public get id(): string | undefined {
        return this.props.id;
    }

    static create(props: CategoryProps) {
        props.id = props.id ? props.id : v4()
        const category = new Category(props);
        return category;
    }
}