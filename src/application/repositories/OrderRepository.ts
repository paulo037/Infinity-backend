import { Order } from "../../domain/entities/order/order"
import { OrderHasProduct } from "../../domain/entities/order/order_has_product"


export interface OrderRepository{
    create(order: Order):Promise<null>
    createOrderHasProduct(orderHasProducts: OrderHasProduct[]):Promise<null>
    update(order: Order):Promise<null>
    delete(id: string):Promise<null>
    findByUserId(id: string): Promise<Order | null>
    getAll():Promise<Order[]>
}