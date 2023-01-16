import { InMemoryCategoryRepository } from "../../../../tests/respositories/in-momory-category-repository";
import { InMemoryProductRepository } from "../../../../tests/respositories/in-momory-product-repository";
import {InMemorySizeRepository } from "../../../../tests/respositories/in-momory-size-repository"
import { Category } from "../../../domain/entities/product/category";
import { Product } from "../../../domain/entities/product/product";
import { UpdateProduct } from "./update-product";

describe('Update Product', () => {

   

    it('should be able to update a  product', async () => {
        const productRepository = new InMemoryProductRepository;
        const categoryRepository = new InMemoryCategoryRepository;
        const sizeRepository = new InMemorySizeRepository;
        
        const category = new Category({ name: 'Blusa', image: 'www.exemple.com' , id:"1"})

        const p = new Product({
            name: "Camisa",
            price: 20.5,
            id: "1"
        });

        productRepository.items.push(p)

        categoryRepository.items.push(category);
        const sut = new UpdateProduct(productRepository,sizeRepository, categoryRepository );



        const response = await sut.execute({
            name: "Cam",
            id: "1",
            price: 2.5,
            colors: [],
            categories: [],
            images:[],
            description: "",
        });

        expect(response).toBeFalsy();


    })

    it("should be able to throw error sayng : the category you want to update to the product does not exist", async () => {
        const productRepository = new InMemoryProductRepository;
        const categoryRepository = new InMemoryCategoryRepository;
        const sizeRepository = new InMemorySizeRepository;

        const category = new Category({ name: 'Blusa', image: 'www.exemple.com' ,id: "1"})

        const p = new Product({
            name: "Camisa",
            price: 20.5,
            id: "1",
        });

        productRepository.items.push(p)

        categoryRepository.items.push(category);
        const sut = new UpdateProduct(productRepository,sizeRepository, categoryRepository );


        try {
            await sut.execute({
                name: "Camisa",
                id: "1",
                price: 20.5,
                colors: [],
                categories: [],
                images:[],
                description: "",
            });

        } catch(e) {
            expect(e).toBeTruthy();
        }


    })

  
})