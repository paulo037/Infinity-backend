import knex from "../connection";
import { ProductRepository } from "../../application/repositories/ProductRepository";
import { Product } from "../../domain/entities/product/product";


class ProductController implements ProductRepository{
    create(product: Product): Promise<null> {
        throw new Error("Method not implemented.");
    }
    update(product: Product): Promise<null> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<null> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<Product | null> {
        throw new Error("Method not implemented.");
    }
    findByName(name: string): Promise<Product | null> {
        throw new Error("Method not implemented.");
    }
    async getByCategory(id: number): Promise<Product[]> {
        let products = await knex.select('p.product_id as Id' , 'p.name as Nome' , 'p.price as Preço')
                                .from('product as p')
                                .join('product_has_category as phc','p.product_id', 'phc.product_id')
                                .where('phc.product_id', id);

        const numVendas = await knex('product').count("*", {as :"numVendas"}).first();
        products.forEach((e, index) => {
            products[index].numVendas = numVendas?.numVendas
        } );
        return products;
        
    }
    getAllNames(): Promise<string[]> {
        throw new Error("Method not implemented.");
    }
   
}

export = ProductController;