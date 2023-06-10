import { Order } from "../../domain/entities/order/order"
import { OrderHasProduct } from "../../domain/entities/order/order_has_product"
import { OrderHasPromotion } from "../../domain/entities/order/order_has_promotion"
import { Status } from "../../domain/entities/order/status"
import { Disccount } from "../services/order/create-order"


export interface OrderRepository {
    create(order: Order, orderHasProducts: OrderHasProduct[], disccounts : OrderHasPromotion[]): Promise<null>
    update(id: string, status: number,  tracking_code?: string | null): Promise<null> 
    delete(user_id: string, id: string): Promise<null>
    get(id: string): Promise<Order | null>
    getBasic(id: string): Promise<Order | null> 
    getAll(page: number, limit: number, status?: Status): Promise<Order[]> 
    findByUserId(user_id: string, page: number, limit: number): Promise<Order[][]> 
    getLenght(status: Status): Promise<number>
    getLenghtByUserId(user_id: String): Promise<number> 
}