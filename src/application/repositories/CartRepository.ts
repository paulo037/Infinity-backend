import { Product } from "../../domain/entities/product/product"
import { Cart } from "../../domain/entities/user/cart"


export interface CartRepository{
    getCart(id: number):Promise<Product[]>
    create(cart: Cart):Promise<null>
    update(cart: Cart):Promise<null>
    delete(user_id: number):Promise<null>
    findByUserId(user_id: number): Promise<Cart | null>
}