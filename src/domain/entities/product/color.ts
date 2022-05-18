import { Entity } from "../../../core/domain/entities";

type ColorProps = {
    value: string;
}

export class Color extends Entity<ColorProps>{
    private constructor(props: ColorProps) {
        super(props);
    }

    public get value() : string {
        return this.props.value;
    }

    public get id() : string {
        return this.id;
    }

    static create(props: ColorProps) {
        const color = new Color(props)

        return color;
    }
}