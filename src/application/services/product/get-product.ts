import { Product } from "../../../domain/entities/product/product"
import { Validation } from "../../../domain/validation/validation";
import { ProductRepository } from "../../repositories/ProductRepository";

type GetProductRequest = {
    id: number
}


export class GetProduct {

    constructor(
        private productRepository: ProductRepository,
    ) { }

    async execute({ id }: GetProductRequest) {


        const product = await this.productRepository.findById(id);
        Validation.existOrError(product, "Produto não encontrado");
      
        return product;

        
    }
}