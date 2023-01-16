import { ProductHasColor} from "../../../domain/entities/product/product_has_color";
import { Size } from "../../../domain/entities/product/size";
import { Validation } from "../../../domain/validation/validation";
import { ProductRepository } from "../../repositories/ProductRepository";
import { SizeRepository } from "../../repositories/SizeRepository";

export type CreateProductHasColorRequest = {
    size_id: string;
    color_id: string;
    product_id: string;
    quantity: number;
}


export class CreateProductHasColor {

    constructor(
        private SizeRepository: SizeRepository,
    ) { }



    async execute({
        size_id,
        color_id,
        product_id,
        quantity }: CreateProductHasColorRequest) {

        let SizeExist = await this.SizeRepository.findById(size_id)


        Validation.existOrError(SizeExist, "Tamanho não existe!");
        Validation.validPositiveOrError(quantity, "Quantidade menor que 1 !")

        SizeExist = SizeExist as Size

        const size = new ProductHasColor({
            size_id,
            color_id,
            product_id,
            quantity
        });

        return size;

    }
}