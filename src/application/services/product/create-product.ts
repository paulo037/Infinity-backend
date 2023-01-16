import { Product } from "../../../domain/entities/product/product";
import { Validation } from "../../../domain/validation/validation";
import { ProductRepository } from "../../repositories/ProductRepository";
import { Image } from "../../../domain/entities/product/image";
import { SizeRepository } from "../../repositories/SizeRepository";
import { CategoryRepository } from "../../repositories/CategoryRepository";
import { CreateArrayProductHasColor } from "./create-array-product-has-color";
import { CreateArrayProductHasCategory } from "./create-array-product-has-category";
import { CreateProductHasColorRequest } from "./create-product-has-color";
import { CreateProductHasCategoryRequest } from "./create-product-has-category";

export type CreateProductRequest = {
    product: Product;
    createImages: Image[],
    categories: CreateProductHasCategoryRequest[],
    colors: CreateProductHasColorRequest[],
}



export class CreateProduct {

    constructor(
        private repository: ProductRepository,
        private sizeRepository: SizeRepository,
        private categoryRepository: CategoryRepository,
        private createArrayProductHasColor = new CreateArrayProductHasColor(sizeRepository),
        private createArrayProductHasCategory = new CreateArrayProductHasCategory(categoryRepository),
    ) { }

    async execute({ product, createImages, colors, categories }: CreateProductRequest) {

        Validation.validPriceOrError(product.price, "Preço invalido!");


        const product_has_color = await this.createArrayProductHasColor.execute(colors, product.id)

        const product_has_category = await this.createArrayProductHasCategory.execute(categories, product.id)

        await this.repository.create(product, product_has_color, product_has_category, createImages);

    }
}
