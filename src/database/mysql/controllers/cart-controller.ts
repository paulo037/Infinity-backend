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

        console.log(userLog)

        if (userLog == undefined) return response.status(401).send('unauthorized')

        let id = parseInt(request.params.id);
        console.log(request.params)
        if (userLog.id != id) return response.status(401).send('unauthorized')

        try {
            const products = await this.repository.getCart(id)
            console.log(products)
            return response.json(products);
        } catch (error) {
            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }
    
    
    public postCart = async (request: Request, response: Response) => {
        
        const userLog = request.user as JwtPayload
        
        
        if (userLog == undefined) return response.status(401).send('unauthorized')
        
        try {
            const newCart = Cart.create(request.body.cart)
            console.log("new-cart", newCart)
            await this.repository.create(newCart)


            return response.status(201).send("Produto Adicionado !")
        } catch (error) {

            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }


    public updateCart = async (request: Request, response: Response) => {

        const userLog = request.user as JwtPayload


        if (userLog == undefined) return response.status(401).send('unauthorized')

        try {
   
            const newCart = Cart.create(request.body.cart)
            console.log(request.body)
            await this.repository.update(newCart)


            return response.status(201).send("Produto atualizado !")
        } catch (error) {

            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }



    public deleteCart = async (request: Request, response: Response) => {

        const userLog = request.user as JwtPayload


        if (userLog == undefined) return response.status(401).send('Não autorizado!')

        try {
            const newCart = Cart.create(request.body.cart)
            console.log(request.body)
            await this.repository.delete(newCart)


            return response.status(200).send("Produto excluído !")
        } catch (error) {

            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }


}
