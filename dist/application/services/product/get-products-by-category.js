"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetProductByCategory = void 0;
const validation_1 = require("../../../domain/validation/validation");
class GetProductByCategory {
    constructor(productRepository, categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }
    async execute({ id }) {
        const category = await this.categoryRepository.findById(id);
        validation_1.Validation.existOrError(category, "Categoria não encontrada");
        return this.productRepository.getByCategory(id);
    }
}
exports.GetProductByCategory = GetProductByCategory;
