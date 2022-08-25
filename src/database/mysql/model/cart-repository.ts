
import { CartRepository } from "../../../application/repositories/CartRepository";
import { Product } from "../../../domain/entities/product/product";
import { Cart, CartProps } from "../../../domain/entities/user/cart";
import knex from "../connection";


export class CartRepositoryMysql implements CartRepository {
    
    create(cart: Cart): Promise<null> {
        throw new Error("Method not implemented.");
    }
    update(cart: Cart): Promise<null> {
        throw new Error("Method not implemented.");
    }
    delete(user_id: number): Promise<null> {
        throw new Error("Method not implemented.");
    }
    findByUserId(user_id: number): Promise<Cart | null> {
        throw new Error("Method not implemented.");
    }

    async getCart(id: number): Promise<Product[]> {
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
                    "p.price as price")
                .where("cart.user_id", id)
                .andWhere(function () {
                    this.where('i.primary', true)
                    this.orWhere('i.primary', null)
                });

            return products
        } catch (e) {
            console.log(e)
            throw new Error("Não foi possível encontrar o carrinho!")
        }
    }

    async postCart(newCart: CartProps): Promise<null> {
        try {
            await knex('cart')
                .insert(newCart)

            return null
        } catch (e) {
            console.log(e)
            throw new Error("Produto já está presente no carrinho!")
        }

    }



}
