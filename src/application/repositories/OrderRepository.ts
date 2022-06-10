import { Order } from "../../domain/entities/order/order"


export interface OrderRepository{
    create(order: Order):Promise<null>
    update(order: Order):Promise<null>
    delete(id: number):Promise<null>
    findByUserId(id: number): Promise<Order | null>
    getAll():Promise<Order[]>
}