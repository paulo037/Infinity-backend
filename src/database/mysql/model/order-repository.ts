
import { OrderRepository } from "../../../application/repositories/OrderRepository";
import { Order } from "../../../domain/entities/order/order";
import knex from "../connection";



export class OrderRepositoryMsql implements OrderRepository {
    async create(order: Order): Promise<null> {
        throw new Error("Method not implemented.");
    }
    async update(order: Order): Promise<null> {
        throw new Error("Method not implemented.");
    }
    async delete(id: number): Promise<null> {
        throw new Error("Method not implemented.");
    }
    async findByUserId(id: number): Promise<Order | null> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<Order[]> {
        let order = await knex('order')
                            .select('price', 'date', 'city', 'user_id', 'status' )
        order = order.map(o => {
            o.date = new Date(o.date).toLocaleString();
            return o;
        })
        return order;
    }
   
}
