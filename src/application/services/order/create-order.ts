import { OrderHasProduct, OrderHasProductProps } from "../../../domain/entities/order/order_has_product";
import { Address, AddressProps } from "../../../domain/entities/user/address";
import { v4 } from "uuid"
import { Order, OrderProps } from "../../../domain/entities/order/order";
import { OrderRepository } from "../../repositories/OrderRepository";
import { Status } from "../../../domain/entities/order/status";


export type CreateOrderRequest = {
    order_has_products: OrderHasProduct[],
    address: Address,
}

export type OrderHasProductRequest = {
    unit_price: number,
    quantity: number,
    id: string,
}


export class CreateOrder {

    constructor(
        private repository: OrderRepository,
    ) { }


    async execute({
        order_has_products,
        address,
    }: CreateOrderRequest) {

        const order_id = v4()
        let price = 0.0


        order_has_products.forEach((element, index) => {
            price += element.props.quantity * element.props.product_price
        })

        order_has_products.forEach((element, index) => {
            price += element.props.quantity * element.props.product_price
        })


        order_has_products = order_has_products.map((element) => {
            element.props.order_id = order_id
            return element
        })



        delete address.props.id
        
        const order = Order.create({
            id: order_id,
            price: price,
            status: Status.PAYMENT_PENDING,
            ...address.props
        })


        return await this.repository.create(order, order_has_products).then(() =>  order_id)




    }
}
