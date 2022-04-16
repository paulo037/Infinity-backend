import { Product } from "../../../domain/entities/product/product"
import { Validation } from "../../../domain/validation/validation";
import { CategoryRepository } from "../../repositories/CategoryRepository";
import { ProductRepository } from "../../repositories/ProductRepository";

type UpdateProductRequest = {
    name: string;
    id: number,
    description?: string;
    price: number;
    height?: number;
    width?: number;
    length?: number;
    category_id: number;
}


export class UpdateProduct {

    constructor(
        private productRepository: ProductRepository,
        private categoryRepository: CategoryRepository,
    ) { }



    async execute({ 
        name,
        id,
        description,
        price,
        height,
        width,
        length,
        category_id }: UpdateProductRequest) {


        const category = await this.categoryRepository.findById(category_id);
        const product = await this.productRepository.findById(id);
        

        Validation.existOrError(category, "Categoria selecionada não existe.");
        Validation.validPriceOrError(price, "Preço invalido!")
        Validation.existOrError(product, "Produto não encontrado.");
        

     
        const productUpdate = Product.create({
            name,
            description,
            price,
            height,
            width,
            length,
            category_id
        },id);

        this.productRepository.update(productUpdate);

    }
}