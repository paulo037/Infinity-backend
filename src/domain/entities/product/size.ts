import { v4 } from "uuid";
import { Entity } from "../../../core/domain/entities";

type SizeProps = {
    value: string;
    id?: string;
}

export class Size extends Entity<SizeProps>{
    private constructor(props: SizeProps) {
        super(props);
    }

    public get value() : string {
        return this.props.value;
    }

    public get id() :  string | undefined  {
        return this.props.id;
    }

    static create(props: SizeProps) {
        props.id = props.id ? props.id : v4()
        const size = new Size(props)

        return size;
    }
}