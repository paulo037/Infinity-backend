import { Product } from "../../domain/entities/product/product"
import { Cart } from "../../domain/entities/user/cart"


export interface CartRepository{
    getCart(id: string):Promise<Product[]>
    create(cart: Cart):Promise<null>
    update(cart: Cart):Promise<null>
    delete(cart: Cart):Promise<null>
    findByUserId(user_id: string): Promise<Cart | null>
    numberOfProducts(user_id: string): Promise<Number>
    deleteAll(user_id: string): Promise<null> 
}