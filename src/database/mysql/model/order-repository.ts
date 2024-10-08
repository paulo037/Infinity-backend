
/**
 * @type {Knex}
 */
import { OrderRepository } from "../../../application/repositories/OrderRepository";
import { Disccount } from "../../../application/services/order/create-order";
import { Order } from "../../../domain/entities/order/order";
import { OrderHasProduct } from "../../../domain/entities/order/order_has_product";
import { OrderHasPromotion } from "../../../domain/entities/order/order_has_promotion";
import { Status } from "../../../domain/entities/order/status";
import knex from "../connection";


export class OrderRepositoryMsql implements OrderRepository {


    async getLenght(status: Status): Promise<number> {
        try {
            const order = await knex('order')
                .count('* as count')
                .where(function () {
                    if (status && status >= Status.PAYMENT_REFUSED && status <= Status.ORDER_DELIVERED) {
                        this.where('status', status);
                    }
                }).first() as any;
            return order.count as number;

        } catch (e) {
            throw new Error("Não foi possível realizar a contagem!")
        }
    }

    async getLenghtByUserId(user_id: String): Promise<number> {
        try {
            const order = await knex('order')
                .count('* as count')
                .where('status', '>=',Status.PAYMENT_APPROVED)
                .andWhere('user_id', user_id).first() as any;
            return order.count as number;

        } catch (e) {
            throw new Error("Não foi possível realizar a contagem!")
        }
    }

    async get(id: string): Promise<Order | null> {
        try {
            return await knex.transaction(async trx => {
                let order = await trx('order as o')
                    .select('*').where('o.id', id).first();

                if (order == undefined) {
                    throw new Error("Erro ao buscar pedido!");
                }

                const ohp = await trx('order as o')
                    .select('p.name as name',
                        'i.url as image',
                        'ohp.size as size',
                        'ohp.color as color',
                        'ohp.product_price as price',
                        'ohp.quantity as quantity',
                        'ohp.product_id as product_id',
                    )

                    .join('order_has_product as ohp', 'ohp.order_id', 'o.id')
                    .join('product as p', 'ohp.product_id', 'p.id')
                    .leftJoin('image as i', 'p.id', 'i.product_id')
                    .where(function () {
                        this.where('i.primary', true).orWhere('i.primary', null)
                    })
                    .andWhere('o.id', order.id)
                    .orderBy('o.created_at', 'desc');

                const ohpr = await trx('order_has_promotion')
                    .select('promotion_id', 'price', 'quantity')
                    .where('order_id', order.id);

                const user = await trx('user as u')
                    .select("cpf", "first_name", "last_name", "id")
                    .where("u.id", order.user_id).first();

                order.products = ohp;;
                order.promotions = ohpr;
                order.user = user;

                return order;
            })

        } catch (error) {
            throw new Error("Erro ao buscar pedido!");
        }
    }

    async getBasic(id: string): Promise<Order | null> {
        try {
            return await knex.transaction(async trx => {
                let order = await trx('order as o')
                    .join('user', 'user.id', 'o.user_id')
                    .select('price', 'state', 'city', 'first_name', 'user.email as email')
                    .where('o.id', id).first();

                return order;
            })

        } catch (error) {
            throw new Error("Erro ao buscar pedido!");
        }
    }

    async create(order: Order, orderHasProducts: OrderHasProduct[], orderHasPromotions: OrderHasPromotion[]): Promise<null> {

        try {
            await knex.transaction(async trx => {
                await trx('order').insert(order)
                await trx('order_has_product').insert(orderHasProducts)
                if (orderHasPromotions.length > 0) {
                    await trx('order_has_promotion').insert(orderHasPromotions)
                }
            })
            return null
        } catch (error) {
            console.log(error)
            throw new Error("Não foi possível criar pedido!");
        }
    }

    async update(id: string, status: Status, tracking_code?: string): Promise<null> {
        try {
            await knex.transaction(async trx => {
                await trx('order').update({ 'status': status }).where('id', id)
                if (status == Status.PAYMENT_APPROVED) {
                    await trx('order_has_product as ohp')
                        .join('color as c', 'c.value', 'ohp.color')
                        .join('size as s', 's.value', 'ohp.size')
                        .join('product_has_color as phc', function () {
                            this.on('phc.product_id', '=', 'ohp.product_id')
                                .andOn('phc.size_id', '=', 's.id')
                                .andOn('phc.color_id', '=', 'c.id');
                        })
                        .where('ohp.order_id', id)
                        .update('phc.quantity', trx.raw('phc.quantity - ohp.quantity'));

                }
            })
            if (tracking_code) {
                await knex('order').update({ "tracking_code": tracking_code }).where("id", id)
            }
        } catch (error) {
            throw new Error("Erro ao atualizar pedido!");
        }
        return null;
    }

    async updateRating(id: string, rating: number, user_id: string): Promise<null> {
        try {

            await knex('order_has_product as ohp')
                .join('order as o', 'o.id', 'ohp.order_id')
                .update('rating', rating)
                .where('ohp.id', id)
                .andWhere('o.user_id', user_id)
                .andWhere('o.status', Status.ORDER_DELIVERED)
        } catch (error) {

            throw new Error("Erro ao avaliar produto!");
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
                    .andWhere("o.status", '<=', Status.PAYMENT_PENDING)
                    .andWhere('o.user_id', user_id);

                ohp = ohp.map((o: any) => o.id)

                if (ohp.length == 0) throw new Error("Erro ao apagar pedido!");


                let ohpromotion = await trx('order as o')
                    .select('ohpromotion.id as id')
                    .join('order_has_promotion as ohpromotion', 'ohpromotion.order_id', 'o.id')
                    .where("o.id", id);

                ohpromotion = ohpromotion.map((o: any) => o.id)


                await trx('order_has_product as ohp')
                    .whereIn('id', ohp)
                    .delete();

                await trx('order_has_promotion')
                    .whereIn('id', ohpromotion)
                    .delete();

                await trx('order')
                    .where("id", id)
                    .andWhere('user_id', user_id)
                    .delete();
            })
        } catch (error) {
            console.log(error)
            throw new Error("Erro ao apagar pedido!");
        }

        return null;
    }

    async getAll(page: number, limit: number, status?: Status): Promise<Order[]> {

        try {
            let orders = await knex('order')
                .select('id', 'created_at', 'state', 'city', 'price', 'status')
                .where(function () {
                    if (status && status >= Status.PAYMENT_REFUSED && status <= Status.ORDER_DELIVERED) {
                        this.where('status', status);
                    }
                })
                .limit(limit).offset(page * limit - limit)
                .orderBy('created_at', 'desc');

            return orders;
        } catch (error) {
            throw new Error("Erro ao buscar pedidos!");

        }
    }

    async findByUserId(user_id: string, page: number, limit: number): Promise<Order[][]> {
        try {
            return await knex.transaction(async trx => {
                const ordens = await trx('order as o')
                    .select('id ',
                        'created_at',
                        'status',
                        'tracking_code',
                        'id',)
                    .where('o.user_id', user_id)
                    .andWhere('o.status', '>=', Status.PAYMENT_APPROVED)
                    .orderBy('o.created_at', 'desc')
                    .limit(limit).offset(page * limit - limit);

                let ordersWithProducts = []
                for await (const [index, order] of ordens.entries()) {
                    let ohp = await trx('order as o')
                        .select('p.name as name',
                            'i.url as image',
                            'i.provider as provider',
                            'ohp.size as size',
                            'ohp.color as color',
                            'ohp.product_price as price',
                            'ohp.quantity as quantity',
                            'ohp.product_id as product_id',
                            'ohp.rating as rating',
                            'ohp.id as id',
                            knex.raw('GROUP_CONCAT(phc.category_id) as categories')
                        )
                        .join('order_has_product as ohp', 'ohp.order_id', 'o.id')
                        .join('product as p', 'ohp.product_id', 'p.id')
                        .join('product_has_category as phc', 'phc.product_id', 'p.id')
                        .leftJoin('image as i', 'p.id', 'i.product_id')
                        .where(function () {
                            this.where('i.primary', true).orWhere('i.primary', null)
                        })
                        .andWhere('o.id', order.id)
                        .groupBy('p.id', 'i.url', 'i.provider', 'ohp.size', 'ohp.color', 'ohp.product_price', 'ohp.quantity', 'ohp.rating', 'ohp.id');


                    order.products = ohp.map((oh) => {
                        return {
                            ...oh,
                            categories: oh.categories ? oh.categories.split(',') : [],

                        }
                    });
                    ordersWithProducts.push(order);
                }

                return ordersWithProducts;
            })

        } catch (error) {
            console.log(error)
            throw new Error("Erro ao buscar pedidos!");

        }
    }

}
