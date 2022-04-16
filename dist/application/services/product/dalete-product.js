"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteProduct = void 0;
const validation_1 = require("../../../domain/validation/validation");
class DeleteProduct {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute({ id }) {
        const productExist = await this.productRepository.findById(id);
        validation_1.Validation.existOrError(productExist, "Produto não encontrado");
        return this.productRepository.delete(id);
    }
}
exports.DeleteProduct = DeleteProduct;
