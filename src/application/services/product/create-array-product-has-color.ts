import { ProductHasColor } from "../../../domain/entities/product/product_has_color";
import { Size } from "../../../domain/entities/product/size";
import { Validation } from "../../../domain/validation/validation";
import { ProductRepository } from "../../repositories/ProductRepository";
import { SizeRepository } from "../../repositories/SizeRepository";
import { CreateProductHasColor, CreateProductHasColorRequest } from "./create-product-has-color";



export class CreateArrayProductHasColor {

    constructor(
        private SizeRepository: SizeRepository,
        private createProductHasColor = new CreateProductHasColor(SizeRepository)
    ) { }


    public execute = async (colors: CreateProductHasColorRequest[], product_id: string)
        : Promise<ProductHasColor[]> => {
        let productHasColor = []
        if (colors) {
            for await (const [index, color] of colors.entries()) {
                const c = await this.createProductHasColor.execute({
                    product_id: product_id,
                    color_id: color.color_id,
                    quantity: color.quantity,
                    size_id: color.size_id
                });

                productHasColor.push(c);
            }
            return productHasColor;
        }
        return [];

    }
}