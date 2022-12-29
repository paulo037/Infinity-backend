import axios from "axios";
import e, { Response, Request } from "express";
import { JwtPayload } from "../../../application/config/auth";
import { mercadopago } from "../../../application/config/mercadopago";
import { CreateItemPreference, CreateItemPreferenceRequest, ItemPreference } from "../../../application/services/order/create-item-preference";
import { CreateOrder, CreateOrderRequest, OrderHasProductRequest } from "../../../application/services/order/create-order";
import { CreateOrderHasProduct, CreateOrderHasProductRequest } from "../../../application/services/order/create-order-has-product";
import { CreatePreference, Preference } from "../../../application/services/order/create-preference";
import { CreateAddress } from "../../../application/services/user/create-address";
import { FindUserByEmail } from "../../../application/services/user/find-user-by-email ";
import { OrderHasProduct } from "../../../domain/entities/order/order_has_product";
import { AddressProps } from "../../../domain/entities/user/address";
import { logger } from "../../../logger";
import { CartRepositoryMysql } from "../model/cart-repository";
import { OrderRepositoryMsql } from "../model/order-repository";
import { ProductRepositoryMsql } from "../model/product-repository";
import { UserRepositoryMysql } from "../model/user-repository";

const dotenv = require('dotenv')
dotenv.config()

const APPROVED = 1;
const REJECTED = -1;

export class OrderController {

    constructor(
        private repository = new OrderRepositoryMsql(),
        private cartRepository = new CartRepositoryMysql(),
        private userRepository = new UserRepositoryMysql(),
        private productRepository = new ProductRepositoryMsql(),
        private findUserByEmail = new FindUserByEmail(userRepository),
        private createAddress = new CreateAddress(userRepository),
        private createOrder = new CreateOrder(repository),
        private createPreference = new CreatePreference(userRepository),
        private createItemPreference = new CreateItemPreference(productRepository),
        private createOrderHasProduct = new CreateOrderHasProduct(productRepository)

    ) { }

    public getAll = async (request: Request, response: Response) => {
        try {
            const userLog = request.user as JwtPayload
            if (userLog == undefined) return response.status(401).send('unauthorized')

            let orders = await this.repository.getAll()

            response.status(200).json(orders)
        } catch (error) {

            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }

    }

    public getbyId = async (request: Request, response: Response) => {
        try {
            const userLog = request.user as JwtPayload
            if (userLog == undefined) return response.status(401).send('unauthorized')

            const id = request.params.id;
            const order = await this.repository.get(id) as any;
            if (userLog.id != order.user.id) return response.status(401).send('unauthorized')
            response.status(200).json(order);

        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }

    public getbyUserId = async (request: Request, response: Response) => {
        try {
            const userLog = request.user as JwtPayload
            if (userLog == undefined) return response.status(401).send('unauthorized')

            let orders = await this.repository.findByUserId(userLog.id)

            response.status(200).json(orders)
        } catch (error) {

            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }

    }

    public delete = async (request: Request, response: Response) => {
        try {
            const id = request.params.id
            const userLog = request.user as JwtPayload
            if (userLog == undefined) return response.status(401).send('unauthorized')

            let orders = await this.repository.delete(userLog.id, id)

            response.status(200).json(orders)
        } catch (error) {

            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }

    }

    public update = async (request: Request, response: Response) => {
        try {
            const id = request.params.id;
            const userLog = request.user as JwtPayload;
            const status = request.body.status;
            const tracking_code = request.body.tracking_code;
            if (userLog == undefined) return response.status(401).send('unauthorized');
            if (status == undefined) return response.status(400).send('Status não informado');

            await this.repository.update(id, status, tracking_code);

            response.status(201).send();
        } catch (error) {
            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }

    public newOrder = async (request: Request, response: Response) => {
        try {



            const userLog = request.user as JwtPayload
            if (userLog == undefined) return response.status(401).send('unauthorized')

            const user = await this.findUserByEmail.execute(userLog.email)

            if (user == null) return response.status(401).send('unauthorized')


            if (request.body.type === 'cart') {
                this.cartRepository.deleteAll(user.id as string)
            }

            let items = [] as ItemPreference[]

            for await (const [index, element] of request.body.items.entries()) {

                const c = await this.createItemPreference.create(element)
                items.push(c);

            }

            const address = await this.createAddress.execute(request.body.address)

            let order_has_products = [] as OrderHasProduct[]

            for await (const [index, element] of request.body.items.entries()) {
                const c = await this.createOrderHasProduct.execute(element)
                order_has_products.push(c);

            }

            try {

                const order_id = await this.createOrder.execute({ order_has_products, address })

                const preference = await this.createPreference.execute({ email: user.props.email, items, address, order_id })
                const id = await mercadopago.preferences.create(preference)
                return response.json({ id: id.body.id });
            } catch (error) {

                return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
            }

        } catch (error) {
            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }

    public webhook = async (request: Request, response: Response) => {

        const id = request.body.data.id

        const config = {
            headers: {
                Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
            }
        };


        let payment: Preference

        const resp = await axios.get(`https://api.mercadopago.com/v1/payments/${id}`, config)

        payment = resp.data


        const { status, external_reference } = payment

        console.log({ status, external_reference })

        switch (status) {
            case "approved":
                await this.repository.update(external_reference, APPROVED)
                break;

            case "rejected":
                await this.repository.update(external_reference, REJECTED)
                break;
            default:
                break;
        }

        return response.status(200).send()
    }




}
