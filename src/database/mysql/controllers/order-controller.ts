import axios from "axios";
import { Response, Request } from "express";
import { JwtPayload } from "../../../application/config/auth";
import { mercadopago } from "../../../application/config/mercadopago";
import { FindUserByEmail } from "../../../application/services/user/find-user-by-email ";
import { OrderRepositoryMsql } from "../model/order-repository";
import { UserRepositoryMysql } from "../model/user-repository";

export class OrderController {
    constructor(
        private repository = new OrderRepositoryMsql(),
        private userRepository = new UserRepositoryMysql(),
        private findUserByEmail = new FindUserByEmail(userRepository)

    ) { }

    public getAll = async (request: Request, response: Response) => {
        try {
            let orders = await this.repository.getAll()

            response.status(200).json(orders)
        } catch (error) {

            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }

    }



    public createPreference = async (request: Request, response: Response) => {
        try {
            const items = request.body.items;
            const userLog = request.user as JwtPayload

            if (userLog == undefined) return response.status(401).send('unauthorized')


            const user = await this.findUserByEmail.execute(userLog.email)

            if (user == null) return response.status(401).send('unauthorized')

            let preference = {
                items: items,

                payer: {
                    name: user.props.first_name,
                    surname: user.props.last_name,
                    email: user.props.email,
                    identification: {
                        type: "CPF",
                        number: user.props.cpf,
                    },

                },


                back_urls: {
                    success: "http://localhost:3000/cart",
                    failure: "http://localhost:3000/"
                },
                auto_return: "approved",


                payment_methods: {

                    excluded_payment_types: [
                        {
                            id: "ticket"
                        }
                    ],

                },

                external_reference: user.props.id?.toString(),
                statement_descriptor: "INFINITYMODAS",
                binary_mode: true,
            }

            try {
                const id = await mercadopago.preferences.create(preference)
                console.log(id)
                return response.json({ id: id.body.id });
            } catch (error) {
                return response.status(204).send(error instanceof Error ? error.message : "Houve um erro inesperado");
            }

        } catch (error) {

            return response.status(204).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }



    public webhook = async (request: Request, response: Response) => {

        const id = request.body.data.id

        const config = {
            headers: {
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            }
        };

        const payment = await axios.get(`https://api.mercadopago.com/v1/payments/${id}`, config)

        console.log(payment)



        return response.status(200).send()
    }



}
