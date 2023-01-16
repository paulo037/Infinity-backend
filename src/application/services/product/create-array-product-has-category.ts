import { Category } from "../../../domain/entities/product/category";
import { ProductHasCategory } from "../../../domain/entities/product/product_has_category";
import { CategoryRepository } from "../../repositories/CategoryRepository";
import { CreateProductHasCategory, CreateProductHasCategoryRequest } from "./create-product-has-category";




export class CreateArrayProductHasCategory {

    constructor(
        private categoryRepository: CategoryRepository,
        private createProductHasCategory = new CreateProductHasCategory(categoryRepository)
    ) { }


    public execute = async (items: CreateProductHasCategoryRequest[], product_id: string)
        : Promise<ProductHasCategory[]> => {
        let productHasCategory = []
        if (items) {
            for await (const [index, category] of items.entries()) {
                const c = await this.createProductHasCategory.execute({
                    product_id: product_id,
                    name: category.name
                });

                productHasCategory.push(c);
            }
            return productHasCategory;
        }
        return [];

    }
}