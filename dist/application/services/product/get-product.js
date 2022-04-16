"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProduct = void 0;
const validation_1 = require("../../../domain/validation/validation");
class GetProduct {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute({ id }) {
        const product = await this.productRepository.findById(id);
        validation_1.Validation.existOrError(product, "Produto não encontrado");
        return product;
    }
}
exports.GetProduct = GetProduct;
