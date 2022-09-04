import { Category } from "../../../domain/entities/product/category";
import { ProductHasCategory } from "../../../domain/entities/product/product_has_category";     
import { Validation } from "../../../domain/validation/validation";
import { CategoryRepository } from "../../repositories/CategoryRepository";
import { ProductRepository } from "../../repositories/ProductRepository";

type CreateProductHasCategoryRequest = {
    category_name: string;
    product_id: string;
}


export class CreateProductHasCategory {

    constructor(
        private CategoryRepository: CategoryRepository,
        private ProductRepository: ProductRepository,
    ) { }



    async execute({
        category_name,
        product_id }: CreateProductHasCategoryRequest) {

        let categoryExist = await this.CategoryRepository.findByName(category_name)
        const productExist = await this.ProductRepository.findById(product_id)


        Validation.existOrError(categoryExist, "Tamanho não existe");
        Validation.existOrError(productExist, "Produto não existe");



        categoryExist = categoryExist as Category
        const phc = ProductHasCategory.create({
            category_id: categoryExist.id as string,
            product_id: product_id,
        });

        return phc;

    }
}