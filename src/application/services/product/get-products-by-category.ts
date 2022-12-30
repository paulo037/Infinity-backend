import { Product } from "../../../domain/entities/product/product"
import { Validation } from "../../../domain/validation/validation";
import { CategoryRepository } from "../../repositories/CategoryRepository";
import { ProductRepository } from "../../repositories/ProductRepository";

type GetProductByCategoryRequest = {
    name: string;
}


export class GetProductByCategory {

    constructor(
        private productRepository: ProductRepository,
        private categoryRepository: CategoryRepository,
    ) { }

    async execute({ name }: GetProductByCategoryRequest) {

        const category = await this.categoryRepository.findByName(name)
        Validation.existOrError(category, "Categoria não encontrada");
      
        return this.productRepository.getByCategory(category?.id as string)

        
    }
}