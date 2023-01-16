import { JwtPayload } from "../../../application/config/auth";
import { Response, Request } from "express";
import { CartRepositoryMysql } from "../model/cart-repository";
import { Cart } from "../../../domain/entities/user/cart";

export class CartController {
    constructor(
        private repository = new CartRepositoryMysql(),

    ) { }

    public getCart = async (request: Request, response: Response) => {

        const userLog = request.user as JwtPayload


        if (userLog == undefined) return response.status(401).send('Não autorizado!')

        let id = userLog.id;

        try {
            const products = await this.repository.getCart(id)

            return response.json(products);
        } catch (error) {
            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }


    public postCart = async (request: Request, response: Response) => {

        const userLog = request.user as JwtPayload


        if (userLog == undefined) return response.status(401).send('Não autorizado!')

        try {
            let cartProps = request.body.cart
            cartProps.user_id = userLog.id;

            const cart = new Cart(cartProps)

            await this.repository.create(cart)

            return response.status(201).send("Produto Adicionado!")
        } catch (error) {

            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }


    public updateCart = async (request: Request, response: Response) => {

        const userLog = request.user as JwtPayload


        if (userLog == undefined) return response.status(401).send('Não autorizado!')

        try {
            let cartProps = request.body.cart
            cartProps.user_id = userLog.id;

            const cart = new Cart(cartProps)

            await this.repository.update(cart)


            return response.status(201).send("Produto atualizado!")
        } catch (error) {

            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }



    public deleteCart = async (request: Request, response: Response) => {

        const userLog = request.user as JwtPayload


        if (userLog == undefined) return response.status(401).send('Não autorizado!')

        try {
            let cartProps = request.body.cart
            cartProps.user_id = userLog.id;

            const cart = new Cart(cartProps)

            await this.repository.delete(cart)


            return response.status(200).send("Produto excluído!")
        } catch (error) {

            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }


    public getNumberofProducts = async (request: Request, response: Response) => {

        const userLog = request.user as JwtPayload

        if (userLog == undefined) return response.status(401).send('Não autorizado!')

        try {

            const number = await this.repository.numberOfProducts(userLog.id)
            return response.json({number}).status(200)
        } catch (error) {

            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }


}
