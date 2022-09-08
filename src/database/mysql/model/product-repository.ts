import knex from "../connection";
import { ProductRepository } from "../../../application/repositories/ProductRepository";
import { Product } from "../../../domain/entities/product/product";
import { ProductHasColor } from "../../../domain/entities/product/product_has_color";
import { ProductHasCategory } from "../../../domain/entities/product/product_has_category";
import { Image } from "../../../domain/entities/product/image";
import { v4 as uuidv4 } from "uuid"




export class ProductRepositoryMsql implements ProductRepository {


    async getLenght(): Promise<number> {
        try {
            const count = await knex('product').count('* as count').first() as unknown as number;
            return count;

        } catch (e) {
            throw new Error("Não foi possível realizar a contagem!")
        }
    }

    async getAll(page: number, limit: number): Promise<Product[]> {
        try {

            const products = await knex('product as p')
                .leftJoin('image as i', 'p.id', 'i.product_id')
                .select('i.url as image', 'p.name as name', 'p.id  as id', 'p.price as price')
                .where('i.primary', true)
                .orWhere('i.url', null)
                .limit(limit).offset(page * limit - limit)


            return products;

        } catch (e) {
            throw new Error("Não foi possível realizar a busca!")
        }

    }


    async create(product: Product): Promise<string> {
        try {

            const id =  uuidv4()

            await knex('product').insert({ id:id , ...product.props });

          
            return id;

        } catch (e) {
            throw new Error("Não foi possível criar o produto!")
        }
    }

    async update(product: Product): Promise<null> {
        try {

            await knex('product as p')
                .update({ ...product.props })
                .where('p.id', product.props.id);
            return null;
        } catch (e) {
            throw new Error("Não foi possível atualizar o produto!")
        }

    }

    async updateColor(colors: ProductHasColor[], product_id: string): Promise<null> {
        try {
            await knex('product_has_color as phc')
                .where('phc.product_id', product_id)
                .del();

            if (colors.length > 0) {
                await knex.insert(colors.map(c => c.props)).into('product_has_color')
            }

            return null;
        } catch (e) {
            throw new Error("Não foi possível atualizar as cores do produto!")
        }

    }

    async updateCategories(categories: ProductHasCategory[], product_id: string): Promise<null> {
        try {

            await knex('product_has_category as phc')
                .where('phc.product_id', product_id)
                .del();

            if (categories.length > 0) {
                await knex.insert(categories.map(c => c.props)).into('product_has_category')
            }


            return null;

        } catch (e) {
            throw new Error("Não foi possível atualizar as categorias do produto!")
        }
    }

    async updateImages(images: Image[], product_id: string): Promise<null> {
        try {

            try {
                await knex('image')
                    .where('image.product_id', product_id)
                    .del()


                if (images.length > 0) {

                    images = images.map((i) => {
                        return { ...i, id: uuidv4() }
                    }
                    )


                    await knex.insert(images).into('image')
                }
            } catch (error) {
                throw error
            }


            return null;

        } catch (e) {
            throw new Error("Não foi possível atualizar as imagens do produto!")
        }

    }


    async delete(id: string): Promise<null> {
        try {

            await knex('product')
                .where('product.id', id)
                .delete();
            return null;

        } catch (e) {
            throw new Error("Não foi possível deletar o produto!")
        }

    }

    async findById(id: string): Promise<Product | null> {
        try {
            let product = await knex('product as p')
                .select('p.name as name',
                    'p.price as price',
                    'p.description as description',
                    'p.height as height',
                    'p.length as length',
                    'p.id as id')
                .avg('ohp.rating as rating')
                .sum('ohp.quantity as sold')
                .leftJoin('order_has_product as ohp', 'p.id', 'ohp.product_id')
                .where('p.id', id)
                .first();


            product = product as unknown as Product;
            let colors = await knex('color as c')
                .select(
                    'c.value as color',
                    'c.id as color_id',
                    's.value as size',
                    's.id as size_id',
                    'phc.quantity as quantity')
                .join('product_has_color as phc', 'phc.color_id', ' c.id')
                .join('size as s', 'phc.size_id', ' s.id')
                .where('phc.product_id', id);

            product.colors = colors.map(color => {
                return {
                    "size_id": color.size_id,
                    "size": color.size,
                    "color_id": color.color_id,
                    "color": color.color,
                    "quantity": color.quantity
                }
            })

            let categories = await knex('category as c')
                .join('product_has_category as phc', 'phc.category_id', 'c.id')
                .where('phc.product_id', id);


            product.categories = categories.map(category => {
                return { "name": category.name, "image": category.image, "id": category.id }
            })

            let images = await knex('image as i')
                .where('i.product_id', id);


            product.images = images.map(image => {
                return { "id": image.id, "name": image.name, "url": image.url, "primary": image.primary, "key": image.key }
            })

            try {

                product.images.sort((a: any, b: any) => a.primary - b.primary).reverse();
            } catch (error) {
                product.images = []
            }

            return product as Product;


        } catch (e) {
            throw new Error("Não foi possível realizar a busca pelo produto!")
        }


    }
    async findByName(name: string): Promise<string | null> {
        try {
            let product = await knex('product')
                .select('id')
                .where('name', name)
                .first();

            if (product) {
                return product.id
            }
            throw new Error("Não foi possível encontrar um produto com esse nome!")



        } catch (e) {
            throw new Error("Não foi possível encontrar um produto com esse nome!")
        }

    }
    async getByCategory(id: string): Promise<Product[]> {
        try {

            let products = await knex.select('p.id as id', 'p.name as name', 'p.price as price', 'i.url as image', 'c.name as category')
                .avg('ohp.rating as rating')
                .sum('ohp.quantity as sold')
                .from('product as p')
                .join('product_has_category as phc', 'p.id', 'phc.product_id')
                .join('category as c', 'c.id', 'phc.category_id')
                .leftJoin('image as i', 'p.id', 'i.product_id')
                .leftJoin('order_has_product as ohp', 'p.id', 'ohp.product_id')
                .where('phc.category_id', id)
                .andWhere(function () {
                    this.where('i.primary', true)
                    this.orWhere('i.primary', null)
                })
                .groupBy('p.id', 'p.name', 'p.price', 'i.url', 'c.name');

            return products as Product[];

        } catch (e) {
            throw new Error("Não foi possível encontrar um produto com essa categoria!")
        }


    }

    async search(search: string): Promise<Product[]> {
        try {

            let products = await knex.select('p.id as id',
                'p.name as name',
                'p.price as price',
                'i.url as image')
                .avg('ohp.rating as rating')
                .sum('ohp.quantity as sold')
                .from('product as p')
                .leftJoin('image as i', 'p.id', 'i.product_id')
                .leftJoin('order_has_product as ohp', 'p.id', 'ohp.product_id')
                .where('p.name', 'LIKE', `%${search}%`)
                .andWhere(function () {
                    this.where('i.primary', true)
                    this.orWhere('i.primary', null)
                })
                .groupBy('p.id', 'p.name',
                    'p.price',
                    'i.url')
                .orderBy([{ column: 'sold', order: 'desc' }, 'rating', { column: 'i.url', nulls: 'last' }]);

            for await (const [index, product] of products.entries()) {
                let categories = await knex.select('c.name as category', 'c.id as id')
                    .from('category as c')
                    .join('product_has_category as phc', 'phc.category_id', 'c.id')
                    .where('phc.product_id', product.id);
                product.categories = categories;

            }

            return products as Product[];
        } catch (e) {
            throw new Error("Não foi possível realizar a busca!")
        }

    }
    async getAllNames(): Promise<string[]> {
        try {
            let products = await knex.select('p.name as name')
                .from('product as p')
            products = products.map(p => p.name)
            return products;

        } catch (e) {
            throw new Error("Não foi possível realizar a busca!")
        }
    }

}
