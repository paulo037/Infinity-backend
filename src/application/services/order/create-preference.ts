import { Address } from "../../../domain/entities/user/address";
import { UserRepository } from "../../repositories/UserRepository";
import { FindUserByEmail } from "../user/find-user-by-email ";
import { ItemPreference } from "./create-item-preference";

const dotenv = require('dotenv')
dotenv.config()


export type CreatePreferenceRequest = {
    email: string,
    items: ItemPreference[],
    address: Address,
    order_id: string,
}


export type Preference = {

    items: ItemPreference[],

    payer: Object,

    back_urls: Object

    auto_return: string,

    payment_methods: Object,

    external_reference: string,
    statement_descriptor: string,
    binary_mode: boolean,
    expires: boolean,
    expiration_date_from: string,
    expiration_date_to: string,

    status?: string
}


export class CreatePreference {

    constructor(
        private userRepository: UserRepository,
        private findUserByEmail = new FindUserByEmail(userRepository),
    ) { }




    async execute({
        email,
        items,
        address,
        order_id,
    }: CreatePreferenceRequest) {


        const user = await this.findUserByEmail.execute(email);


        let now = new Date()

        let expireDate = new Date()
        expireDate.setHours(expireDate.getHours() + 3)


        let preference = {
            items: items,

            payer: {
                name: user.props.first_name,
                surname: user.props.last_name,
                email: user.props.email,

                phone: {
                    area_code: address.props.telephone.toString().substring(0, 2),
                    number: parseInt(address.props.telephone.toString().substring(2, 11)),

                },

                identification: {
                    type: "CPF",
                    number: user.props.cpf,
                },

                address: {
                    street_name: address.props.street,
                    street_number: address.props.number,
                    zip_code: address.props.cep
                }

            },


            back_urls: {
                success: `${process.env.BASE_FRONT}/cart`,
                failure: process.env.BASE_FRONT,
            },

            auto_return: "approved",


            payment_methods: {

                excluded_payment_types: [
                    {
                        id: "ticket"
                    }
                ],

            },

            external_reference: order_id,
            statement_descriptor: "Infinity modas",
            binary_mode: true,
            expires: true,
            expiration_date_from: now.toISOString().replace('Z', '-00:00'),
            expiration_date_to: expireDate.toISOString().replace('Z', '-00:00'),
        }


        return preference;

    }
}
