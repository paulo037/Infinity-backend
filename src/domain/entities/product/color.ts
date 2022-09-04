import { v4 } from "uuid";
import { Entity } from "../../../core/domain/entities";

type ColorProps = {
    value: string;
    id?: string;
}

export class Color extends Entity<ColorProps>{
    private constructor(props: ColorProps) {
        super(props);
    }

    public get value(): string {
        return this.props.value;
    }

    public get id(): string {
        return this.id;
    }

    static create(props: ColorProps) {
        props.id = props.id ? props.id : v4()
        const color = new Color(props)

        return color;
    }
}