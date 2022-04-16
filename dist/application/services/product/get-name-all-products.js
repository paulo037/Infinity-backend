"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNameProduct = void 0;
class GetNameProduct {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async execute() {
        const names = await this.productRepository.getAllNames();
        return names;
    }
}
exports.GetNameProduct = GetNameProduct;
