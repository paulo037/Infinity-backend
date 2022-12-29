
import { CartRepository } from "../../../application/repositories/CartRepository";
import { Product } from "../../../domain/entities/product/product";
import { Cart } from "../../../domain/entities/user/cart";
import knex from "../connection";


export class CartRepositoryMysql implements CartRepository {


    async update(cart: Cart): Promise<null> {
        try {
            return await knex.transaction(async trx => {
                const product = await trx('product_has_color')
                    .select('quantity')
                    .where('product_id', cart.props.product_id)
                    .andWhere('color_id', cart.props.color_id)
                    .andWhere('size_id', cart.props.size_id)
                    .first();

                if (cart.props.quantity > product.quantity) {

                    throw new Error("Quantidade máxima já selecionada!");

                }
                if (cart.props.quantity < 1) {

                    throw new Error("Quantidade mínima já selecionada!");
                }



                await trx('cart').update({ ...cart.props })
                    .where('product_id', cart.props.product_id)
                    .where('user_id', cart.props.user_id)

                    .andWhere('color_id', cart.props.color_id)
                    .andWhere('size_id', cart.props.size_id)

                return null;
            })
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Erro ao atualizar item!');
        }

    }

    async delete(cart: Cart): Promise<null> {
        try {

            await knex('cart').delete()
                .where('product_id', cart.props.product_id)
                .where('user_id', cart.props.user_id)
                .andWhere('color_id', cart.props.color_id)
                .andWhere('size_id', cart.props.size_id)

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

    findByUserId(user_id: string): Promise<Cart | null> {
        throw new Error("Method not implemented.");
    }

    async getCart(id: string): Promise<Product[]> {
        try {
            const products = await knex('cart')
                .join('product as p', 'p.id', 'cart.product_id')
                .join('size as s', 's.id', 'cart.size_id')
                .join('color as c', 'c.id', 'cart.color_id')
                .leftJoin('image as i', 'i.product_id', 'cart.product_id')
                .select("p.name as name",
                    "s.value as size",
                    "s.id as size_id",
                    "c.value as color",
                    "c.id as color_id",
                    "cart.quantity as quantity",
                    "i.url as image",
                    "p.price as price",
                    "p.id as product_id")
                .where("cart.user_id", id)
                .andWhere(function () {
                    this.where('i.primary', true).orWhere('i.primary', null)
                });

            return products
        } catch (e) {
            throw new Error("Não foi possível encontrar o carrinho!")
        }
    }

    async create(newCart: Cart): Promise<null> {
        try {
            await knex('cart')
                .insert({ ...newCart.props })

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
