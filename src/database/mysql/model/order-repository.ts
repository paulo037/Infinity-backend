
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
            throw new Error("Não foi possível adicionar o produto ao pedido!");
        }


    }
    async create(order: Order): Promise<null> {
        try {
            await knex('order').insert(order.props)
            return null
        } catch (error) {
            throw new Error("Não foi possível criar pedido!");
        }
    }

    async update(status: number, id: string): Promise<null> {
        try {
            await knex('order').update("status", status).where("id", id)
        } catch (error) {
            throw new Error("Erro ao atualizar pedido!");
        }
        return null;
    }
    async delete(user_id: string, id: string): Promise<null> {

        try {
            await knex.transaction(async trx => {

                let ohp = await trx('order as o')
                    .select('ohp.id as id')
                    .join('order_has_product as ohp', 'ohp.order_id', 'o.id')
                    .where("o.id", id)
                    .andWhere('o.user_id', user_id);

                ohp = ohp.map(o => o.id)

                if (ohp.length == 0) throw new Error("Erro ao apagar pedido!");


                await trx('order_has_product as ohp')
                    .whereIn('id', ohp)
                    .delete();

                await trx('order')
                    .where("id", id)
                    .andWhere('user_id', user_id)
                    .delete();
            })
        } catch (error) {

            throw new Error("Erro ao apagar pedido!");
        }

        return null;
    }
    async findByUserId(id: string): Promise<Order | null> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<Order[]> {

        try {
            let order = await knex('order')
                .select('*')
            return order;
        } catch (error) {
            throw new Error("Erro ao buscar pedidos!");

        }
    }

    async get(user_id: string): Promise<Order[][]> {
        try {
            return await knex.transaction(async trx => {
                const ordersIds = await trx('order as o').select('o.id').where('o.user_id', user_id)
                let orders = []
                for await (const [index, order_id] of ordersIds.entries()) {
                    const order = await trx('order as o')
                        .select('p.name as name',
                            'i.url as image',
                            'ohp.size as size',
                            'ohp.color as color',
                            'ohp.product_price as price',
                            'ohp.quantity as quantity',
                            'o.created_at as date',
                            'o.status as status',
                            'o.id as id',

                        )
                        .join('order_has_product as ohp', 'ohp.order_id', 'o.id')
                        .join('product as p', 'ohp.product_id', 'p.id')
                        .leftJoin('image as i', 'p.id', 'i.product_id')
                        .where(function () {
                            this.where('i.primary', true).orWhere('i.primary', null)
                        })
                        .andWhere('o.id', order_id.id)
                        .orderBy('o.created_at', 'asc');

                    orders.push(order);
                }

                return orders;
            })

        } catch (error) {
            throw new Error("Erro ao buscar pedidos!");

        }
    }

}
