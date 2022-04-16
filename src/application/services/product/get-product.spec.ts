import { InMemoryCategoryRepository } from "../../../../tests/respositories/in-momory-category-repository";
import { InMemoryProductRepository } from "../../../../tests/respositories/in-momory-product-repository";
import { Category } from "../../../domain/entities/product/category";
import { Product } from "../../../domain/entities/product/product";
import { GetProduct} from "./get-product";

describe('Get Product', () => {
    it('should be able to get a product from database ', async () => {

        const productRepository = new InMemoryProductRepository;
        const categoryRepository = new InMemoryCategoryRepository;

        const category = Category.create({
            name: 'Blusa',
            image: 'www.exemple.com'
        }, 1);

        const product = Product.create({
            name: "Paulo",
            price: 20.5,
            category_id: 1,
          
        } , 1);

        categoryRepository.items.push(category);
        productRepository.items.push(product);

        const sut = new GetProduct(productRepository)

        let response = await sut.execute({ id: 1 })
       

        expect(response).toBeTruthy()
    })

    it('should be able to throw an error saying the product doesnt exist', async () => {
    
        const productRepository = new InMemoryProductRepository;
        const categoryRepository = new InMemoryCategoryRepository;
    
        const category = Category.create({
            name: 'Blusa',
            image: 'www.exemple.com'
        }, 1);
    
        const product = Product.create({
            name: "Paulo",
            price: 20.5,
            category_id: 1,
          
        } , 2);
    
        categoryRepository.items.push(category);
        productRepository.items.push(product);
    
        const sut = new GetProduct(productRepository);
        try{
            await sut.execute({ id: 1 })
    
        }catch(e){
            expect(e).toBeTruthy()
        }
       
    
    })
})


