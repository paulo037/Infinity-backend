import { Size } from "../../../domain/entities/product/size";
import { Validation } from "../../../domain/validation/validation";
import { SizeRepository } from "../../repositories/SizeRepository";

type CreateSizeRequest = {
    value:string
}


export class CreateSize {

    constructor(
        private SizeRepository: SizeRepository,
    ) { }



    async execute({ 
        value}: CreateSizeRequest) {

        const SizeExist = await this.SizeRepository.findByValue(value)
        

        Validation.notExistOrError(SizeExist, "Um tamanho com esse valor já existe");
        

     
        const size = Size.create({
          value
        });

        this.SizeRepository.create(size);

    }
}