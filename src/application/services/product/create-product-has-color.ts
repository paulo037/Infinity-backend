import { ProductHasColor} from "../../../domain/entities/product/product_has_color";
import { Size } from "../../../domain/entities/product/size";
import { Validation } from "../../../domain/validation/validation";
import { ProductRepository } from "../../repositories/ProductRepository";
import { SizeRepository } from "../../repositories/SizeRepository";

type CreateProductHasColorRequest = {
    size_id: number;
    color_id: number;
    product_id: number;
    quantity: number;
}


export class CreateProductHasColor {

    constructor(
        private SizeRepository: SizeRepository,
        private ProductRepository: ProductRepository,
    ) { }



    async execute({
        size_id,
        color_id,
        product_id,
        quantity }: CreateProductHasColorRequest) {

        let SizeExist = await this.SizeRepository.findById(size_id)
        const ProductExist = await this.ProductRepository.findById(product_id)


        Validation.existOrError(SizeExist, "Tamanho não existe");
        Validation.existOrError(ProductExist, "Produto não existe");
        Validation.validPositiveOrError(quantity, "Quantidade menor que 1")

        SizeExist = SizeExist as Size

        const size = ProductHasColor.create({
            size_id,
            color_id,
            product_id,
            quantity
        });

        return size;

    }
}