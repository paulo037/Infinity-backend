import { v4 } from "uuid";
import { Entity } from "../../../core/domain/entities";


type UserProps = {
    first_name: string;
    last_name: string;
    image: string;
    password: string;
    email: string;
    cpf: string;
    admin?: boolean;
    id?: string;
}

export class User extends Entity<UserProps>{


    private constructor(props: UserProps) {
        super(props);
    }

    public get email(): string {
        return this.props.email;
    }

    public get id() {
        return this.props.id;
    }

    static create(props: UserProps) {
        props.id = props.id ? props.id : v4()

        const user = new User(props)

        return user;
    }
}
