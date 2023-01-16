import { Category } from "../../../domain/entities/product/category";
import { ProductHasCategory } from "../../../domain/entities/product/product_has_category";
import { Validation } from "../../../domain/validation/validation";
import { CategoryRepository } from "../../repositories/CategoryRepository";
import { ProductRepository } from "../../repositories/ProductRepository";

export type CreateProductHasCategoryRequest = {
    name: string;
    product_id: string;
}


export class CreateProductHasCategory {

    constructor(
        private CategoryRepository: CategoryRepository,
    ) { }



    async execute({
        name,
        product_id }: CreateProductHasCategoryRequest) {

        let categoryExist = await this.CategoryRepository.findByName(name)

        Validation.existOrError(categoryExist, "Tamanho não existe");


        categoryExist = categoryExist as Category
        const phc = new ProductHasCategory({
            category_id: categoryExist.id as string,
            product_id: product_id,
        });

        return phc;

    }
}