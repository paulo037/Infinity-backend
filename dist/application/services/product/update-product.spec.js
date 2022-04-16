"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const in_momory_category_repository_1 = require("../../../../tests/respositories/in-momory-category-repository");
const in_momory_product_repository_1 = require("../../../../tests/respositories/in-momory-product-repository");
const category_1 = require("../../../domain/entities/product/category");
const product_1 = require("../../../domain/entities/product/product");
const update_product_1 = require("./update-product");
describe('Update Product', () => {
    it('should be able to update a  product', async () => {
        const productRepository = new in_momory_product_repository_1.InMemoryProductRepository;
        const categoryRepository = new in_momory_category_repository_1.InMemoryCategoryRepository;
        const category = category_1.Category.create({ name: 'Blusa', image: 'www.exemple.com' }, 1);
        const p = product_1.Product.create({
            name: "Camisa",
            price: 20.5,
            category_id: 1
        }, 1);
        productRepository.items.push(p);
        categoryRepository.items.push(category);
        const sut = new update_product_1.UpdateProduct(productRepository, categoryRepository);
        const response = await sut.execute({
            name: "Cam",
            id: 1,
            price: 2.5,
            category_id: 1
        });
        expect(response).toBeFalsy();
    });
    it("should be able to throw error sayng : the category you want to update to the product does not exist", async () => {
        const productRepository = new in_momory_product_repository_1.InMemoryProductRepository;
        const categoryRepository = new in_momory_category_repository_1.InMemoryCategoryRepository;
        const category = category_1.Category.create({ name: 'Blusa', image: 'www.exemple.com' }, 1);
        const p = product_1.Product.create({
            name: "Camisa",
            price: 20.5,
            category_id: 1
        }, 1);
        productRepository.items.push(p);
        categoryRepository.items.push(category);
        const sut = new update_product_1.UpdateProduct(productRepository, categoryRepository);
        try {
            await sut.execute({
                name: "Camisa",
                id: 1,
                price: 20.5,
                category_id: 2
            });
        }
        catch (e) {
            expect(e).toBeTruthy();
        }
    });
});
