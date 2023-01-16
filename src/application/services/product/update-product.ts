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

export type UpdateProductRequest = {
    product: Product;
    createImages: Image[],
    deleteImages: Image[],
    updateImages: Image[],
    categories: CreateProductHasCategoryRequest[],
    colors: CreateProductHasColorRequest[],
}



export class UpdateProduct {

    constructor(
        private repository: ProductRepository,
        private sizeRepository: SizeRepository,
        private categoryRepository: CategoryRepository,
        private createArrayProductHasColor = new CreateArrayProductHasColor(sizeRepository),
        private createArrayProductHasCategory = new CreateArrayProductHasCategory(categoryRepository),
    ) { }

    async execute({ product, createImages, deleteImages, updateImages, colors, categories}: UpdateProductRequest) {

        Validation.validPriceOrError(product.price, "Preço invalido!");


        const product_has_color = await this.createArrayProductHasColor.execute(colors, product.id)

        const product_has_category = await this.createArrayProductHasCategory.execute(categories, product.id)

        await this.repository.update(product, product_has_color, product_has_category, createImages, deleteImages, updateImages);

    }
}

