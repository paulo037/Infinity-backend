import knex from "../connection";
import { ProductRepository } from "../../../application/repositories/ProductRepository";
import { Product } from "../../../domain/entities/product/product";


export class ProductRepositoryMsql implements ProductRepository {
    async getAll(): Promise<Product[]> {
        const products = await knex('product as p')
        .join('image as i', 'p.id', 'i.product_id')
        .select('i.url as image', 'p.name as name', 'p.id  as id', 'p.price as price' )
        .where('i.primary', true)

            
        return products;
    }
    async create(product: Product): Promise<null> {
        await knex('product').insert({ ...product.props });
        return null;
    }
    async update(product: Product): Promise<null> {
        await knex('product')
            .update({ ...product.props })
            .where('id', product.props.id);
        return null;
    }
    async delete(id: number): Promise<null> {
        throw new Error("Method not implemented.");
    }
    async findById(id: number): Promise<Product | null> {
        let product = await knex('product')
            .select('*')
            .where('id', id)
            .first();
        let sizes = await knex('size as s')
            .join('product_has_size as phs', 'phs.size_id', 's.id')
            .where('phs.product_id', id);

        product.sizes = sizes.map(size => {
            return { "size": size.value, "quantity": size.quantity }
        })

        let categories = await knex('category as c')
            .join('product_has_category as phc', 'phc.category_id', 'c.id')
            .where('phc.product_id', id);


        product.categories = categories.map(category => {
            return { "name": category.name }
        })

        let images = await knex('image as i')
            .where('i.product_id', id);


        product.images = images.map(image => {
            return {"id" : image.id, "name": image.name, "url": image.url, "primary": image.primary }
        })


        return product;
    }
    async findByName(name: string): Promise<Product | null> {
        console.log(name)
        let product = await knex('product')
            .select('*')
            .where('name', name)
            .first();
        return product;
    }
    async getByCategory(id: number): Promise<Product[]> {
        let products = await knex.select('p.id as Id', 'p.name as Nome', 'p.price as Preço')
            .from('product as p')
            .join('product_has_category as phc', 'p.id', 'phc.product_id')
            .where('phc.product_id', id);

        const numVendas = await knex('product').count("*", { as: "numVendas" }).first();
        products.forEach((e, index) => {
            products[index].numVendas = numVendas?.numVendas
        });
        return products;

    }
    async getAllNames(): Promise<string[]> {
        throw new Error("Method not implemented.");
    }

}
