import { Product } from "../../../domain/entities/product/product"
import { Validation } from "../../../domain/validation/validation";
import { ProductRepository } from "../../repositories/ProductRepository";



export class GetProductById {

    constructor(
        private productRepository: ProductRepository,
    ) { }

    async execute(id : string) {


        const product = await this.productRepository.findById(id) as Product
        Validation.existOrError(product, "Produto não encontrado");
        return product;

        
    }
}