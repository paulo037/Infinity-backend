import { v4 } from "uuid";

type ColorProps = {
    value: string;
    id?: string;
}

export class Color {

    public value: string;
    public id: string;

    constructor({ value, id }: ColorProps) {
        this.value = value
        this.id = id ?? v4()
    }

}