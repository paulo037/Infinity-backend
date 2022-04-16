"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategory = void 0;
const category_1 = require("../../../domain/entities/product/category");
const validation_1 = require("../../../domain/validation/validation");
class CreateCategory {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async execute({ name, image, }) {
        const CategoryExist = await this.categoryRepository.findByName(name);
        validation_1.Validation.notExistOrError(CategoryExist, "Uma Categoria com esse nome já existe");
        const category = category_1.Category.create({
            name,
            image,
        });
        this.categoryRepository.create(category);
    }
}
exports.CreateCategory = CreateCategory;
