import { OrderHasProduct, OrderHasProductProps } from "../../../domain/entities/order/order_has_product";
import { ProductRepository } from "../../repositories/ProductRepository";
import { GetProductById } from "../product/get-product-by-id";

const dotenv = require('dotenv')
dotenv.config()


export type CreateOrderHasProductRequest = {
    quantity: number,
    product_id: string,
    size: string,
    color: string,
    order_id: string,
}




export class CreateOrderHasProduct {




    constructor(
        private productRepository: ProductRepository
    ) { }



    async execute(request: CreateOrderHasProductRequest) {

        const product = await this.productRepository.get(request.product_id)

        if (!product) throw new Error("Produto não encontrado!")

        const props: OrderHasProductProps = {
            ...request,
            product_name: product.name,
            product_price: product.price,
            product_id: product.id as string,

        }
        
        const order_has_product = new OrderHasProduct(props)

        const quantity = await this.productRepository.have(order_has_product);

        if (order_has_product.quantity > quantity) {
            throw new Error(`Não foi possível criar o pedido! pois a quantidade de ${product.name} disponível no estoque é de apenas ${quantity} unidade(s)`)
        }

        return order_has_product;
    }


}