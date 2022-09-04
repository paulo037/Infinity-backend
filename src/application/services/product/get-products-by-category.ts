import { Product } from "../../../domain/entities/product/product"
import { Validation } from "../../../domain/validation/validation";
import { CategoryRepository } from "../../repositories/CategoryRepository";
import { ProductRepository } from "../../repositories/ProductRepository";

type GetProductByCategoryRequest = {
    id: string;
}


export class GetProductByCategory {

    constructor(
        private productRepository: ProductRepository,
        private categoryRepository: CategoryRepository,
    ) { }

    async execute({ id }: GetProductByCategoryRequest) {

        const category = await this.categoryRepository.findById(id)
        Validation.existOrError(category, "Categoria não encontrada");
      
        return this.productRepository.getByCategory(id)

        
    }
}