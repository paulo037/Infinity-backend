import { ProductHasSize } from "../../../domain/entities/product/product_has_size";
import { Size } from "../../../domain/entities/product/size";
import { Validation } from "../../../domain/validation/validation";
import { ProductRepository } from "../../repositories/ProductRepository";
import { SizeRepository } from "../../repositories/SizeRepository";

type CreateProductHasSizeRequest = {
    size_value: string;
    product_id: number;
    quantity: number;
}


export class CreateProductHasSize {

    constructor(
        private SizeRepository: SizeRepository,
        private ProductRepository: ProductRepository,
    ) { }



    async execute({
        size_value,
        product_id,
        quantity }: CreateProductHasSizeRequest) {

        let SizeExist = await this.SizeRepository.findByValue(size_value)
        const ProductExist = await this.ProductRepository.findById(product_id)


        Validation.existOrError(SizeExist, "Tamanho não existe");
        Validation.existOrError(ProductExist, "Produto não existe");
        Validation.validPositiveOrError(quantity, "Quantidade menor que 1")

        SizeExist = SizeExist as Size

        const size = ProductHasSize.create({
            size_id: SizeExist.id as unknown as number,
            product_id,
            quantity
        });

        return size;

    }
}