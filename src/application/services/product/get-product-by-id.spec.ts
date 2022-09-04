import { InMemoryCategoryRepository } from "../../../../tests/respositories/in-momory-category-repository";
import { InMemoryProductRepository } from "../../../../tests/respositories/in-momory-product-repository";
import { Category } from "../../../domain/entities/product/category";
import { Product } from "../../../domain/entities/product/product";
import { GetProductById} from "./get-product-by-id";

describe('Get Product', () => {
    it('should be able to get a product from database ', async () => {

        const productRepository = new InMemoryProductRepository;
        const categoryRepository = new InMemoryCategoryRepository;

        const category = Category.create({
            name: 'Blusa',
            image: 'www.exemple.com',
            id: "1"
        });

        const product = Product.create({
            name: "Paulo",
            price: 20.5,
            id: "1"
          
        });

        categoryRepository.items.push(category);
        productRepository.items.push(product);

        const sut = new GetProductById(productRepository)

        let response = await sut.execute("1")
       

        expect(response).toBeTruthy()
    })

    it('should be able to throw an error saying the product doesnt exist', async () => {
    
        const productRepository = new InMemoryProductRepository;
        const categoryRepository = new InMemoryCategoryRepository;
    
        const category = Category.create({
            name: 'Blusa',
            image: 'www.exemple.com',
            id: "1",
        });
    
        const product = Product.create({
            name: "Paulo",
            price: 20.5,
            id: "2",
          
        });
    
        categoryRepository.items.push(category);
        productRepository.items.push(product);
    
        const sut = new GetProductById(productRepository);
        try{
            await sut.execute("1")
    
        }catch(e){
            expect(e).toBeTruthy()
        }
       
    
    })
})


