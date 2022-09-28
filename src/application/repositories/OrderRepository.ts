import { Order } from "../../domain/entities/order/order"
import { OrderHasProduct } from "../../domain/entities/order/order_has_product"


export interface OrderRepository {
    create(order: Order): Promise<null>
    createOrderHasProduct(orderHasProducts: OrderHasProduct[]): Promise<null>
    update(status: number, id: string): Promise<null>
    delete(user_id: string, id: string): Promise<null>
    findByUserId(id: string): Promise<Order | null>
    getAll(): Promise<Order[]>
    get(user_id: string): Promise<Order[][]>
}