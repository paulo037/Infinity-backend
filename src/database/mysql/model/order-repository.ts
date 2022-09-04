
import { OrderRepository } from "../../../application/repositories/OrderRepository";
import { Order } from "../../../domain/entities/order/order";
import { OrderHasProduct } from "../../../domain/entities/order/order_has_product";
import knex from "../connection";



export class OrderRepositoryMsql implements OrderRepository {


    async createOrderHasProduct(orderHasProducts: OrderHasProduct[]): Promise<null> {
        try {
            await knex('order_has_product').insert(orderHasProducts.map(element => element.props))
            return null
        } catch (error) {
            console.log(error)
            throw new Error("Não foi possível adicionar o produto ao pedido!");
        }


    }
    async create(order: Order): Promise<null> {
        try {
            await knex('order').insert(order.props)
            return null
        } catch (error) {
            console.log(error)
            throw new Error("Não foi possível criar pedido!");
        }
    }

    async update(status: number, id: string): Promise<null> {
        try {
            await knex('order').update("status", status).where("id", id)
        } catch (error) {

        }
        return null;
    }
    async delete(id: string): Promise<null> {
        throw new Error("Method not implemented.");
    }
    async findByUserId(id: string): Promise<Order | null> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<Order[]> {
        let order = await knex('order')
            .select('price', 'created_at', 'city', 'user_id', 'status')
        order = order.map(o => {
            o.created_at = new Date(o.created_at).toLocaleString();
            return o;
        })
        return order;
    }

}
