import { Entity } from "../../../core/domain/entities";

type SizeProps = {
    value: string;
}

export class Size extends Entity<SizeProps>{
    private constructor(props: SizeProps) {
        super(props);
    }

    public get value() : string {
        return this.props.value;
    }

    public get id() : string {
        return this.id;
    }

    static create(props: SizeProps) {
        const size = new Size(props)

        return size;
    }
}