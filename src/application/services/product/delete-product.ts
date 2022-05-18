import { Validation } from "../../../domain/validation/validation";
import { ProductRepository } from "../../repositories/ProductRepository";

type DeleteProductRequest = {
    id: number
}


export class DeleteProduct {

    constructor(
        private productRepository: ProductRepository,
    ) { }

    async execute({ id }: DeleteProductRequest) {


        const productExist = await this.productRepository.findById(id);
        Validation.existOrError(productExist, "Produto não encontrado");
      
        return this.productRepository.delete(id)

        
    }
}