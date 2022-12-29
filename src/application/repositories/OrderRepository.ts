import { Order } from "../../domain/entities/order/order"
import { OrderHasProduct } from "../../domain/entities/order/order_has_product"


export interface OrderRepository {
    create(order: Order, orderHasProducts: OrderHasProduct[]): Promise<null>
    update(id: string, status: number,  tracking_code?: string | null): Promise<null> 
    delete(user_id: string, id: string): Promise<null>
    get(id: string): Promise<Order | null>
    getAll(): Promise<Order[]>
    findByUserId(user_id: string): Promise<Order[][]>
}