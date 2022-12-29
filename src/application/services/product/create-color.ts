import { Color } from "../../../domain/entities/product/color";
import { Validation } from "../../../domain/validation/validation";
import { ColorRepository } from "../../repositories/ColorRepository";

type CreateColorRequest = {
    value:string
    id?: string
}


export class CreateColor {

    constructor(
        private ColorRepository: ColorRepository,
    ) { }



    async execute({ 
        value, id}: CreateColorRequest) {

        const colorExist = await this.ColorRepository.findByValue(value)
        
        try {
            Validation.notExistOrError(colorExist, "Um tamanho com esse valor já existe");
        } catch (error) {
            Validation.differentOrError(colorExist?.value, value,"Um tamanho com esse valor já existe");
        }
        

     
        const color = Color.create({
          value,
          id
        });

        return color;

    }
}