"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProduct = void 0;
const product_1 = require("../../../domain/entities/product/product");
const validation_1 = require("../../../domain/validation/validation");
class CreateProduct {
    constructor(productRepository, categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }
    async execute({ name, description, price, height, width, length, category_id }) {
        const category = await this.categoryRepository.findById(category_id);
        const productExist = await this.productRepository.findByName(name);
        validation_1.Validation.existOrError(category, "Categoria selecionada não existe");
        validation_1.Validation.validPriceOrError(price, "Preço invalido!");
        validation_1.Validation.notExistOrError(productExist, "Um Produto com esse nome já existe");
        const product = product_1.Product.create({
            name,
            description,
            price,
            height,
            width,
            length,
            category_id
        });
        this.productRepository.create(product);
    }
}
exports.CreateProduct = CreateProduct;
