
import { OrderHasPromotion, OrderHasPromotionProps } from "../../../domain/entities/order/order_has_promotion";
import { ProductRepository } from "../../repositories/ProductRepository";
import { GetProductById } from "../product/get-product-by-id";
import { Disccount } from "./create-order";
import { v4 } from "uuid";
const dotenv = require('dotenv')
dotenv.config()


export type CreateOrderHasPromotionRequest = {
    disccount: Disccount
    order_id: string,
}




export class CreateOrderHasPromotion {




    constructor(
      
    ) { }



    async execute(request: CreateOrderHasPromotionRequest) {

     

        const props: OrderHasPromotionProps = {
           
            order_id: request.order_id,
            promotion_id: request.disccount.promotion.id,
            price: request.disccount.price,
            quantity: request.disccount.quantity,

        }


        const order_has_promotion = new OrderHasPromotion(props)
    

        return order_has_promotion;
    }


}