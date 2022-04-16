import { ProductRepository } from "../../repositories/ProductRepository";



export class GetNameProduct {

    constructor(
        private productRepository: ProductRepository,
    ) { }

    async execute() {

        const names = await this.productRepository.getAllNames()
        return names;
        
    }
}