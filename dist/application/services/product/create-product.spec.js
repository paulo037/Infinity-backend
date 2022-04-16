"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const in_momory_category_repository_1 = require("../../../../tests/respositories/in-momory-category-repository");
const in_momory_product_repository_1 = require("../../../../tests/respositories/in-momory-product-repository");
const category_1 = require("../../../domain/entities/product/category");
const create_product_1 = require("./create-product");
describe('Create Product', () => {
    it('should be able to create a new product', async () => {
        const productRepository = new in_momory_product_repository_1.InMemoryProductRepository;
        const categoryRepository = new in_momory_category_repository_1.InMemoryCategoryRepository;
        const category = category_1.Category.create({ name: 'Blusa', image: 'www.exemple.com' }, 1);
        categoryRepository.items.push(category);
        const sut = new create_product_1.CreateProduct(productRepository, categoryRepository);
        const response = await sut.execute({
            name: "Camisa",
            price: 20.5,
            category_id: 1
        });
        expect(response).toBeFalsy();
    });
    it("should be able to throw error sayng the category doesn't exist", async () => {
        const productRepository = new in_momory_product_repository_1.InMemoryProductRepository;
        const categoryRepository = new in_momory_category_repository_1.InMemoryCategoryRepository;
        const category = category_1.Category.create({ name: 'Blusa', image: 'www.exemple.com' }, 1);
        categoryRepository.items.push(category);
        const sut = new create_product_1.CreateProduct(productRepository, categoryRepository);
        try {
            const response = await sut.execute({
                name: "Camisa",
                price: 20.5,
                category_id: 2
            });
        }
        catch (e) {
            expect(e).toBeTruthy();
        }
    });
    it("should be able to throw error sayng : the product with this name exist", async () => {
        const productRepository = new in_momory_product_repository_1.InMemoryProductRepository;
        const categoryRepository = new in_momory_category_repository_1.InMemoryCategoryRepository;
        const category = category_1.Category.create({ name: 'Blusa', image: 'www.exemple.com' }, 1);
        categoryRepository.items.push(category);
        const sut = new create_product_1.CreateProduct(productRepository, categoryRepository);
        await sut.execute({
            name: "Camisa",
            price: 20.5,
            category_id: 1
        });
        try {
            await sut.execute({
                name: "Camisa",
                price: 20.5,
                category_id: 1
            });
        }
        catch (e) {
            expect(e).toBeTruthy();
        }
    });
    it("should be able to throw error sayng : the product price is not valid", async () => {
        const productRepository = new in_momory_product_repository_1.InMemoryProductRepository;
        const categoryRepository = new in_momory_category_repository_1.InMemoryCategoryRepository;
        const category = category_1.Category.create({ name: 'Blusa', image: 'www.exemple.com' }, 1);
        categoryRepository.items.push(category);
        const sut = new create_product_1.CreateProduct(productRepository, categoryRepository);
        try {
            const response = await sut.execute({
                name: "Camisa",
                price: -20.5,
                category_id: 1
            });
        }
        catch (e) {
            expect(e).toBeTruthy();
        }
    });
});
