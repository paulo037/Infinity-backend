import { Size } from "../../../domain/entities/product/size";
import { Validation } from "../../../domain/validation/validation";
import { SizeRepository } from "../../repositories/SizeRepository";

type CreateSizeRequest = {
    value:string
    id?: string
}


export class CreateSize {

    constructor(
        private SizeRepository: SizeRepository,
    ) { }



    async execute({ 
        value, id}: CreateSizeRequest) {

        const SizeExist = await this.SizeRepository.findByValue(value)
        
        try {
            Validation.notExistOrError(SizeExist, "Um tamanho com esse valor já existe");
        } catch (error) {
            Validation.differentOrError(SizeExist?.value, value,"Um tamanho com esse valor já existe");
        }
        

     
        const size = Size.create({
          value,
          id
        });

        return size;

    }
}