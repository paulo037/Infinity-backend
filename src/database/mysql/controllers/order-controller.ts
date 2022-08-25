import { Response, Request } from "express";
import { OrderRepositoryMsql } from "../model/order-repository";

export class OrderController{
    constructor(
        private repository = new OrderRepositoryMsql(),

    ) { }

    public getAll = async (request: Request, response: Response) => {
        try {
            let orders = await this.repository.getAll()
            
            response.status(200).json(orders)
        } catch (error) {
   
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
        
    }

}
