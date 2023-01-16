import { InMemoryCategoryRepository } from "../../../../tests/respositories/in-momory-category-repository";
import { InMemoryProductRepository } from "../../../../tests/respositories/in-momory-product-repository";
import { Category } from "../../../domain/entities/product/category";
import { Product } from "../../../domain/entities/product/product";
import { DeleteProduct } from "./delete-product";

describe('Delete Product', () => {
    it('should be able to delete product from database ', async () => {

        const productRepository = new InMemoryProductRepository;
        const categoryRepository = new InMemoryCategoryRepository;

        const category = new Category({
            name: 'Blusa',
            image: 'www.exemple.com',
            id: "1",
        });

        const product = new Product({
            name: "Paulo",
            price: 20.5,
            id: "1",
        });

        categoryRepository.items.push(category);
        productRepository.items.push(product);

        const sut = new DeleteProduct(productRepository);
        let response = await sut.execute({ id: "1" })
       

        expect(response).toBeNull()
    })

    it('should be able to throw an error saying the product doesnt exist', async () => {
    
        const productRepository = new InMemoryProductRepository;
        const categoryRepository = new InMemoryCategoryRepository;
    
        const category = new Category({
            name: 'Blusa',
            image: 'www.exemple.com',
            id: "1",
        });
    
        const product = new Product({
            name: "Paulo",
            price: 20.5,
            id: "1",
        });
    
        categoryRepository.items.push(category);
        productRepository.items.push(product);
    
        const sut = new DeleteProduct(productRepository);
        try{
            await sut.execute({ id: "1" })
    
        }catch(e){
            expect(e).toBeTruthy()
        }
       
    
    })
})


