import { Entity } from "../../../core/domain/entities";


type UserProps = {
    name: string;
    image: string;
    password: string;
    email: string;
    cpf: string;
    admin?: boolean;
}

export class User extends Entity<UserProps>{
    private constructor(props: UserProps, id?: number) {
        super(props, id);
    }

    public get email() : string {
        return this.props.email;
    }

    public get id() {
        return this._id;
    }

    static create(props: UserProps, id?: number) {
    
        const user = new User(props, id)

        return user;
    }
}
