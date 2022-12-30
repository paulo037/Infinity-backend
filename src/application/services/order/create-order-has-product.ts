import { OrderHasProduct } from "../../../domain/entities/order/order_has_product";
import { ProductRepository } from "../../repositories/ProductRepository";
import { GetProductById } from "../product/get-product-by-id";

const dotenv = require('dotenv')
dotenv.config()


export type CreateOrderHasProductRequest = {
    quantity: number,
    product_id: string,
    size: string,
    color: string,
}




export class CreateOrderHasProduct {




    constructor(
        private productRepository: ProductRepository,
        private findProductById = new GetProductById(productRepository)
    ) { }



    async execute(props: CreateOrderHasProductRequest) {

        const product = await this.findProductById.execute(props.product_id)
        

        const order_has_product = OrderHasProduct.create({
            ...props,
            product_name: product.name,
            product_price: product.price,
            product_id: product.id as string,

        })

        const quantity = await this.productRepository.have(order_has_product);

        if(order_has_product.props.quantity > quantity ){
            throw new Error(`Não foi possível criar o pedido! pois a quantidade de ${product.name} disponível no estoque é de apenas ${quantity} unidade(s)`)
        }

        return order_has_product;
    }


}