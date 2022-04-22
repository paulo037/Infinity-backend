import { Product } from "../../../domain/entities/product/product"
import { Validation } from "../../../domain/validation/validation";
import { ProductRepository } from "../../repositories/ProductRepository";

type GetProductByIdRequest = {
    id: number
}


export class GetProductById {

    constructor(
        private productRepository: ProductRepository,
    ) { }

    async execute({ id }: GetProductByIdRequest) {


        const product = await this.productRepository.findById(id);
        Validation.existOrError(product, "Produto não encontrado");
        
        return product;

        
    }
}