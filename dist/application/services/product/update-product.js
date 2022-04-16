"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProduct = void 0;
const product_1 = require("../../../domain/entities/product/product");
const validation_1 = require("../../../domain/validation/validation");
class UpdateProduct {
    constructor(productRepository, categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }
    async execute({ name, id, description, price, height, width, length, category_id }) {
        const category = await this.categoryRepository.findById(category_id);
        const product = await this.productRepository.findById(id);
        validation_1.Validation.existOrError(category, "Categoria selecionada não existe.");
        validation_1.Validation.validPriceOrError(price, "Preço invalido!");
        validation_1.Validation.existOrError(product, "Produto não encontrado.");
        const productUpdate = product_1.Product.create({
            name,
            description,
            price,
            height,
            width,
            length,
            category_id
        }, id);
        this.productRepository.update(productUpdate);
    }
}
exports.UpdateProduct = UpdateProduct;
