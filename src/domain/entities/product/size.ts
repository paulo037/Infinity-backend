import { v4 } from "uuid";

type SizeProps = {
    value: string;
    id?: string;
}

export class Size {
    public value: string;
    public id: string;

    constructor({ value, id }: SizeProps) {
        this.value = value
        this.id = id ?? v4()
    }

}