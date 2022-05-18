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
}


export class UpdateProduct {

    constructor(
        private productRepository: ProductRepository,
    ) { }



    async execute({ 
        name,
        id,
        description,
        price,
        height,
        width,
        length }: UpdateProductRequest) {


        const product = await this.productRepository.findById(id);
        

        Validation.validPriceOrError(price, "Preço invalido!")
        Validation.existOrError(product, "Produto não encontrado.");
        
     
        const productUpdate = Product.create({
            name,
            description,
            price,
            height,
            width,
            length,
            id,
        });

        return this.productRepository.update(productUpdate);

    }
}