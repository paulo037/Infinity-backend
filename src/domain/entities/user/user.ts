import { Entity } from "../../../core/domain/entities";


type UserProps = {
    name: string;
    image: string;
    password: string;
    email: string;
    cpf: string;
    admin?: boolean;
    id?: number;
}

export class User extends Entity<UserProps>{
    private constructor(props: UserProps) {
        super(props);
    }

    public get email() : string {
        return this.props.email;
    }

    public get id() {
        return this.props.id;
    }

    static create(props: UserProps) {
    
        const user = new User(props)

        return user;
    }
}
