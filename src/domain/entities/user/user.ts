import { v4 } from "uuid";


type UserProps = {
    first_name: string;
    last_name: string;
    image?: string;
    password: string;
    email: string;
    cpf: string;
    admin?: boolean;
    id?: string;
}

export class User {


    public id: string;
    public first_name: string;
    public last_name: string;
    public email: string;
    public password: string;
    public cpf: string;
    public image?: string;
    public admin: boolean;


    constructor(
        {
            id,
            first_name,
            last_name,
            email,
            password,
            cpf,
            image,
            admin }: UserProps
    ) {
        this.id = id ?? v4()
        this.first_name = first_name
        this.last_name = last_name
        this.email = email
        this.password = password
        this.cpf = cpf
        this.image = image
        this.admin = admin ?? false
    }
    
}