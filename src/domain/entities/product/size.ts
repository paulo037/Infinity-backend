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

    static create(props: SizeProps) {
        const size = new Size(props)

        return size;
    }
}