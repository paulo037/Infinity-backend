import { Product } from "../../../domain/entities/product/product"
import { Validation } from "../../../domain/validation/validation";
import { ProductRepository } from "../../repositories/ProductRepository";

type CreateProductRequest = {
    name: string;
    description?: string;
    price: number;
    height?: number;
    width?: number;
    length?: number;
}



export class CreateProduct {

    constructor(
        private productRepository: ProductRepository,
    ) { }

    async execute({ name,
                    description,
                    price,
                    height,
                    width,
                    length}: CreateProductRequest) {

        // const productExist = await this.productRepository.findByName(name);

        Validation.validPriceOrError(price, "Preço invalido!");
        // Validation.notExistOrError(productExist, "<span>Um<wbr> Produto<wbr> com<wbr> esse<wbr> nome<wbr> já<wbr> existe</span>");
        const product = Product.create({
            name,
            description,
            price,
            height,
            width,
            length,
        });

        let id = await this.productRepository.create(product);
        return id;
    }
}

