import { OrderHasProduct } from "../../../domain/entities/order/order_has_product";
import { AddressProps } from "../../../domain/entities/user/address";
import { v4 } from "uuid";
import { Order, OrderProps } from "../../../domain/entities/order/order";
import { OrderRepository } from "../../repositories/OrderRepository";
import { Status } from "../../../domain/entities/order/status";
import { CreateOrderHasProduct } from "./create-order-has-product";
import { ProductRepository } from "../../repositories/ProductRepository";
import { Product } from "../../../domain/entities/product/product";
import { ProductRepositoryMsql } from "../../../database/mysql/model/product-repository";
import { PromotionRepositoryMsql } from "../../../database/mysql/model/promotion-repository";
import { Promotion } from "../../../domain/entities/promotion/promotion";
import { OrderHasPromotion } from "../../../domain/entities/order/order_has_promotion";
import { CreateOrderHasPromotion } from "./create-order-has-promotion";


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


export type CategoryFrequence = {
    product_id: string,
    quantity: number,
    price: number
    categories: string[]
}

type Frequence = {
    price: number;
    quantity: number;
};

export type Disccount = {
    promotion: Promotion,
    price: number;
    quantity: number;
};

async function category_frequence(products: OrderItem[], productRepository: ProductRepositoryMsql) {
    let frequences_result: Record<string, Frequence> = {};

    let ids = products.map((p) => p.product_id);
    let frequences = await productRepository.getCategoryFrequence(ids) as unknown as CategoryFrequence[];
    frequences = frequences.map((f) => {
        const quantity = products.find((o) => o.product_id == f.product_id)?.quantity
        return {
            ...f,
            quantity: quantity ?? 0
        }
    })

    for (const frequence of frequences) {
        for (const category of frequence.categories) {
            if (frequences_result[category]) {
                frequences_result[category].quantity += frequence.quantity;
            } else {
                frequences_result[category] = {
                    price: frequence.price,
                    quantity: frequence.quantity
                };

            }
        }
    }

    return frequences_result;
}


async function calcDiscount(category_frequence: Record<string, Frequence>, promotions: Promotion[]): Promise<Disccount[]> {

    let have = category_frequence;
    let disccount: Record<string, Disccount> = {};
    try {


        for (const promotion of promotions) {
            if (
                !!have[promotion.buying_category_id] &&
                have[promotion.buying_category_id].quantity
            ) {
                let buying_id = promotion.buying_category_id;
                let buying_quantity = promotion.buying_quantity;
                let win_id = promotion.win_category_id;
                let win_quantity = promotion.win_quantity;
                disccount[win_id] = {
                    promotion,
                    quantity: 0,
                    price: 0,
                }

                while (
                    have[buying_id] &&
                    have[buying_id].quantity >= buying_quantity &&
                    have[win_id] &&
                    have[win_id].quantity >= win_quantity
                ) {
                    have[buying_id].quantity -= promotion.buying_quantity;
                    const add_q = Math.min(
                        have[win_id].quantity,
                        promotion.win_quantity
                    );
                    if (disccount[win_id].price == 0 && have[win_id].price != 0) {
                        disccount[win_id].price = have[win_id].price
                    }
                    if (add_q > 0) {
                        have[win_id].quantity -= add_q;
                        disccount[win_id].quantity += add_q;
                    }

                }
            }
        }
    } catch (error) {
        console.log(error)
    }


    let arr = []
    const keysArray = Object.keys(disccount);
    for (const key of keysArray) {
        if(disccount[key].quantity > 0){
            arr.push(disccount[key])
        }
    }

    

    return arr;
}

export class CreateOrder {

    constructor(
        private repository: OrderRepository,
        private productRepository: ProductRepositoryMsql,
        private promotionsRepository: PromotionRepositoryMsql,
        private createOrderHasProduct = new CreateOrderHasProduct(productRepository),
        private createOrderHasPromotion = new CreateOrderHasPromotion(),
    ) { }


    async execute({
        items,
        address,
    }: CreateOrderRequest) {



        const promotions: Promotion[] = await this.promotionsRepository.getByDate(new Date());
        const frequence = await category_frequence(items, this.productRepository);
        const disccounts: Disccount[] = await calcDiscount(frequence, promotions);


        const order_id = v4()

        let order_has_products: OrderHasProduct[] = []
        let order_has_promotion: OrderHasPromotion[] = []

        for await (const [index, element] of items.entries()) {
            const c = await this.createOrderHasProduct.execute({ ...element, order_id })
            order_has_products.push(c);

        }


        for await (const [index, element] of disccounts.entries()) {
            const c = await this.createOrderHasPromotion.execute({ disccount: element, order_id })
            order_has_promotion.push(c);

        }


        let price = order_has_products.reduce((acc: number, product: OrderHasProduct) => acc + (product.product_price * product.quantity), 0.0)
        price -= disccounts.reduce((acc: number, discc: Disccount) => acc + (discc.price * discc.quantity), 0.0)



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


        await this.repository.create(order, order_has_products, order_has_promotion);

        return { order_id, disccounts };

    }
}
