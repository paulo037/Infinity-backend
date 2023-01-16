import { OrderHasProduct } from "../../../domain/entities/order/order_has_product";
import { AddressProps } from "../../../domain/entities/user/address";
import { v4 } from "uuid";
import { Order, OrderProps } from "../../../domain/entities/order/order";
import { OrderRepository } from "../../repositories/OrderRepository";
import { Status } from "../../../domain/entities/order/status";
import { CreateOrderHasProduct } from "./create-order-has-product";
import { ProductRepository } from "../../repositories/ProductRepository";


export type CreateOrderRequest = {
    address: AddressProps,
    items: OrderItem[],
}

export type OrderItem = {
    quantity: number,
    product_id: string,
    size: string,
    color: string,
}


export class CreateOrder {

    constructor(
        private repository: OrderRepository,
        private productRepository: ProductRepository,
        private createOrderHasProduct= new CreateOrderHasProduct(productRepository)
    ) { }


    async execute({
        items,
        address,
    }: CreateOrderRequest) {

        const order_id = v4()

        let order_has_products: OrderHasProduct[] = []

        for await (const [index, element] of items.entries()) {
            const c = await this.createOrderHasProduct.execute({ ...element, order_id })
            order_has_products.push(c);

        }


        const price = order_has_products.reduce((acc: number, product: OrderHasProduct) => acc + (product.product_price * product.quantity), 0.0)



        const shipping_price = price >= 200 ? 0 : 25

        delete address.id

        const orderProps: OrderProps = {
            ...address,
            price: price,
            status: Status.PAYMENT_PENDING,
            shipping_price,
            id: order_id,
        }

        const order = new Order(orderProps)


        return await this.repository.create(order, order_has_products).then(() => order_id)




    }
}
