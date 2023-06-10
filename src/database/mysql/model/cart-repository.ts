
import { P } from "pino";
import { CartRepository } from "../../../application/repositories/CartRepository";
import { Product } from "../../../domain/entities/product/product";
import { Cart } from "../../../domain/entities/user/cart";
import knex from "../connection";


export class CartRepositoryMysql implements CartRepository {


    async update(cart: Cart): Promise<null> {
        try {
            if (cart.quantity < 1) {

                throw new Error("Quantidade mínima já selecionada!");
            }

            return await knex.transaction(async trx => {
                const product = await trx('product_has_color')
                    .select('quantity')
                    .where('product_id', cart.product_id)
                    .andWhere('color_id', cart.color_id)
                    .andWhere('size_id', cart.size_id)
                    .first();

              
                if (!product || cart.quantity > product.quantity) {

                    throw new Error("Quantidade máxima já selecionada!");

                }
               



                await trx('cart').update({ ...cart })
                    .where('product_id', cart.product_id)
                    .where('user_id', cart.user_id)

                    .andWhere('color_id', cart.color_id)
                    .andWhere('size_id', cart.size_id)

                return null;
            })
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Erro ao atualizar item!');
        }

    }

    async delete(cart: Cart): Promise<null> {
        try {

            await knex('cart').delete()
                .where('product_id', cart.product_id)
                .where('user_id', cart.user_id)
                .andWhere('color_id', cart.color_id)
                .andWhere('size_id', cart.size_id)

            return null;
        } catch (error) {
            throw new Error("Não foi possível remover o item!");

        }


    }

    async deleteAll(user_id: string): Promise<null> {
        try {

            await knex('cart').delete()
                .where('user_id', user_id)

            return null;
        } catch (error) {
            throw new Error("Não foi possível remover o item!");

        }


    }

    async findByUserId(user_id: string): Promise<Cart | null> {
        throw new Error("Method not implemented.");
    }

    async getCart(id: string): Promise<Product[]> {
        try {
            var products = await knex.transaction(async (trx) => {
                const products = await trx('cart')
                    .join('product as p', 'p.id', 'cart.product_id')
                    .join('product_has_category as phc', 'phc.product_id', 'p.id')
                    .join('size as s', 's.id', 'cart.size_id')
                    .join('color as c', 'c.id', 'cart.color_id')
                    .leftJoin('image as i', 'i.product_id', 'cart.product_id')
                    .select(
                        'p.name as name',
                        's.value as size',
                        's.id as size_id',
                        'c.value as color',
                        'c.id as color_id',
                        'cart.quantity as quantity',
                        'i.url as image',
                        'p.price as price',
                        'p.id as product_id',
                        knex.raw('GROUP_CONCAT(phc.category_id) as categories')
                    )
                    .where('cart.user_id', id)
                    .andWhere(function () {
                        this.where('i.primary', true).orWhere('i.primary', null);
                    })
                    .groupBy('cart.user_id', 'cart.product_id', 'cart.size_id', 'cart.color_id', ' i.url'); // Agrupa pelo ID do carrinho ou outra coluna única do carrinho


                const formattedProducts = products.map((product) => ({
                    ...product,
                    categories: product.categories ? product.categories.split(',') : [],

                }));

                return formattedProducts
            });


        } catch (e) {
            throw new Error("Não foi possível encontrar o carrinho!")
        }
        return products as Product[];
    }

    async create(newCart: Cart): Promise<null> {
        try {
            await knex('cart')
                .insert(newCart)

            return null
        } catch (e) {
            throw new Error("Produto já está presente no carrinho!")
        }

    }

    async numberOfProducts(user_id: string): Promise<Number> {
        try {
            const number = await knex('cart')
                .count("* as value")
                .where("cart.user_id", user_id)
                .first()


            return number ? number.value as number : 0
        } catch (e) {
            throw new Error("Produto já está presente no carrinho!")
        }

    }



}
