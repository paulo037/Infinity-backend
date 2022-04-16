"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const in_momory_category_repository_1 = require("../../../../tests/respositories/in-momory-category-repository");
const in_momory_product_repository_1 = require("../../../../tests/respositories/in-momory-product-repository");
const category_1 = require("../../../domain/entities/product/category");
const product_1 = require("../../../domain/entities/product/product");
const get_product_1 = require("./get-product");
describe('Get Product', () => {
    it('should be able to get a product from database ', async () => {
        const productRepository = new in_momory_product_repository_1.InMemoryProductRepository;
        const categoryRepository = new in_momory_category_repository_1.InMemoryCategoryRepository;
        const category = category_1.Category.create({
            name: 'Blusa',
            image: 'www.exemple.com'
        }, 1);
        const product = product_1.Product.create({
            name: "Paulo",
            price: 20.5,
            category_id: 1,
        }, 1);
        categoryRepository.items.push(category);
        productRepository.items.push(product);
        const sut = new get_product_1.GetProduct(productRepository);
        let response = await sut.execute({ id: 1 });
        expect(response).toBeTruthy();
    });
    it('should be able to throw an error saying the product doesnt exist', async () => {
        const productRepository = new in_momory_product_repository_1.InMemoryProductRepository;
        const categoryRepository = new in_momory_category_repository_1.InMemoryCategoryRepository;
        const category = category_1.Category.create({
            name: 'Blusa',
            image: 'www.exemple.com'
        }, 1);
        const product = product_1.Product.create({
            name: "Paulo",
            price: 20.5,
            category_id: 1,
        }, 2);
        categoryRepository.items.push(category);
        productRepository.items.push(product);
        const sut = new get_product_1.GetProduct(productRepository);
        try {
            await sut.execute({ id: 1 });
        }
        catch (e) {
            expect(e).toBeTruthy();
        }
    });
});
