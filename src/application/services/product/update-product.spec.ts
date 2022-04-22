import { InMemoryCategoryRepository } from "../../../../tests/respositories/in-momory-category-repository";
import { InMemoryProductRepository } from "../../../../tests/respositories/in-momory-product-repository";
import { Category } from "../../../domain/entities/product/category";
import { Product } from "../../../domain/entities/product/product";
import { UpdateProduct } from "./update-product";

describe('Update Product', () => {

   

    it('should be able to update a  product', async () => {
        const productRepository = new InMemoryProductRepository;
        const categoryRepository = new InMemoryCategoryRepository;
        
        const category = Category.create({ name: 'Blusa', image: 'www.exemple.com' , id:1})

        const p = Product.create({
            name: "Camisa",
            price: 20.5,
            id: 1
        });

        productRepository.items.push(p)

        categoryRepository.items.push(category);
        const sut = new UpdateProduct(productRepository);



        const response = await sut.execute({
            name: "Cam",
            id: 1,
            price: 2.5,
        });

        expect(response).toBeFalsy();


    })

    it("should be able to throw error sayng : the category you want to update to the product does not exist", async () => {
        const productRepository = new InMemoryProductRepository;
        const categoryRepository = new InMemoryCategoryRepository;
        
        const category = Category.create({ name: 'Blusa', image: 'www.exemple.com' ,id: 1})

        const p = Product.create({
            name: "Camisa",
            price: 20.5,
            id: 1,
        });

        productRepository.items.push(p)

        categoryRepository.items.push(category);
        const sut = new UpdateProduct(productRepository);


        try {
            await sut.execute({
                name: "Camisa",
                id: 1,
                price: 20.5,
            });

        } catch(e) {
            expect(e).toBeTruthy();
        }


    })

  
})