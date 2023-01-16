import knex from "../connection";
import { ProductRepository } from "../../../application/repositories/ProductRepository";
import { Product } from "../../../domain/entities/product/product";
import { ProductHasColor } from "../../../domain/entities/product/product_has_color";
import { ProductHasCategory } from "../../../domain/entities/product/product_has_category";
import { Image } from "../../../domain/entities/product/image";
import { OrderHasProduct } from "../../../domain/entities/order/order_has_product";




export class ProductRepositoryMsql implements ProductRepository {



    async getLenght(): Promise<number> {
        try {
            const product = await knex('product').count('* as count').first() as any;
            return product.count;

        } catch (e) {
            throw new Error("Não foi possível realizar a contagem!")
        }
    }

    async getAll(page: number, limit: number): Promise<Product[]> {
        try {

            const products = await knex('product as p')
                .leftJoin('image as i', 'p.id', 'i.product_id')
                .select('i.url as image', 'i.provider as provider', 'p.name as name', 'p.id  as id', 'p.price as price')
                .where('i.primary', true)
                .orWhere('i.url', null)
                .limit(limit).offset(page * limit - limit)


            return products;

        } catch (e) {
            throw new Error("Não foi possível realizar a busca!")
        }

    }

    async get(id: string): Promise<Product | undefined> {
        try {
            let product = await knex<Product>('product')
                .where('id', id)
                .first();
            return product;

        } catch (e) {
            throw new Error("Não foi possível realizar a busca pelo produto!")
        }

    }

    async create(product: Product, colors: ProductHasColor[], categories: ProductHasCategory[], createImages: Image[]): Promise<null> {
        try {

            await knex.transaction(async trx => {

                await knex.insert(product).into('product');
                await this.updateCategories(categories, product.id);
                await this.updateColor(colors, product.id);
                if (createImages.length > 0) {
                    await this.createImages(createImages);
                }
            })
            return null;

        } catch (e) {
            throw new Error("Não foi possível criar o produto!")
        }
    }

    async update(product: Product, colors: ProductHasColor[], categories: ProductHasCategory[], createImages: Image[], deleteImages: Image[], updateImages: Image[]): Promise<null> {
        try {

            await knex.transaction(async trx => {

                await knex('product as p')
                    .update(product)
                    .where('p.id', product.id);
                await this.updateCategories(categories, product.id)
                await this.updateColor(colors, product.id)
                await this.deleteImages(deleteImages);
                await this.updateImages(updateImages);
                if (createImages.length > 0) {
                    await this.createImages(createImages);
                }
            })
            return null;

        } catch (e) {
            throw new Error("Não foi possível criar o produto!")
        }
    }

    async updateColor(colors: ProductHasColor[], product_id: string): Promise<null> {
        try {
            return await knex.transaction(async trx => {

                await trx('product_has_color as phc')
                    .where('phc.product_id', product_id)
                    .del();

                if (colors.length > 0) {
                    await trx.insert(colors).into('product_has_color')
                }

                return null;
            })
        } catch (e) {
            throw new Error("Não foi possível atualizar as cores do produto!")
        }
    }

    async updateCategories(categories: ProductHasCategory[], product_id: string): Promise<null> {
        try {
            return await knex.transaction(async trx => {
                await trx('product_has_category as phc')
                    .where('phc.product_id', product_id)
                    .del();

                if (categories.length > 0) {
                    await trx.insert(categories).into('product_has_category')
                }


                return null;
            })
        } catch (e) {
            throw new Error("Não foi possível atualizar as categorias do produto!")
        }
    }

    async createImages(images: Image[]): Promise<null> {

        try {
            await knex.insert(images).into('image')
            return null;

        } catch (e) {
            console.log(e)
            throw new Error("Não foi possível criar as imagens do produto!")
        }
    }

    async updateImages(images: Image[]): Promise<null> {

        try {
            for await (const [index, image] of images.entries()) {
                await knex('image')
                    .update(image)
                    .where('id', image.id);
            }
            return null;

        } catch (e) {
            throw new Error("Não foi atualizar criar as imagens do produto!")
        }
    }


    async deleteImages(images: Image[]): Promise<null> {


        try {
            await knex('image')
                .del()
                .whereIn('id', images.map(i => i.id))

            return null;

        } catch (e) {
            throw new Error("Não foi possível deletear as imagens do produto!")
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
            return await knex.transaction(async trx => {

                let product = await trx('product as p')
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
                let colors = await trx('color as c')
                    .select(
                        'c.value as color',
                        'c.id as color_id',
                        's.value as size',
                        's.id as size_id',
                        'phc.quantity as quantity')
                    .join('product_has_color as phc', 'phc.color_id', ' c.id')
                    .join('size as s', 'phc.size_id', ' s.id')
                    .where('phc.product_id', id)
                    .andWhere('phc.quantity', '>=', 1);

                product.colors = colors.map((color: any) => {
                    return {
                        "size_id": color.size_id,
                        "size": color.size,
                        "color_id": color.color_id,
                        "color": color.color,
                        "quantity": color.quantity
                    }
                })

                let categories = await trx('category as c')
                    .join('product_has_category as phc', 'phc.category_id', 'c.id')
                    .where('phc.product_id', id);


                product.categories = categories.map((category: any) => {
                    return { "name": category.name, "image": category.image, "id": category.id }
                })

                let images = await trx('image as i')
                    .where('i.product_id', id);


                product.images = images;


                product.images.sort((a: any, b: any) => a.primary - b.primary).reverse();


                return product as Product;
            })

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
                    this.where('i.primary', true).orWhere('i.primary', null)
                })
                .groupBy('p.id', 'p.name', 'p.price', 'i.url', 'c.name');

            return products as Product[];

        } catch (e) {
            throw new Error("Não foi possível encontrar um produto com essa categoria!")
        }


    }

    async search(search: string): Promise<Product[]> {
        try {
            return await knex.transaction(async trx => {

                const search_split = search.split(' ')
                search = search_split.filter((word) => word.length > 3).join('|');
                // search = search.split(' ').join('|');

                if (search.length < 3) return [];
                let products = await trx.select('p.id as id',
                    'p.name as name',
                    'p.price as price',
                    'i.url as image',
                    'p.description as description')
                    .avg('ohp.rating as rating')
                    .sum('ohp.quantity as sold')
                    .from('product as p')
                    .leftJoin('image as i', 'p.id', 'i.product_id')
                    .leftJoin('order_has_product as ohp', 'p.id', 'ohp.product_id')
                    .where(function () {
                        this.where('p.name', 'rlike', search)
                            .orWhere('p.description', 'rlike', search)

                    })
                    .andWhere(function () {
                        this.where('i.primary', true).orWhere('i.primary', null)
                    })
                    .groupBy('p.id', 'p.name',
                        'p.price',
                        'i.url');

                for await (const [index, product] of products.entries()) {
                    let categories = await trx.select('c.name as category', 'c.id as id')
                        .from('category as c')
                        .join('product_has_category as phc', 'phc.category_id', 'c.id')
                        .where('phc.product_id', product.id);
                    product.categories = categories;

                }

                const searchArray = search.split('|')
                products.forEach((product: any) => {
                    let ranking = 0
                    let rankingDescription = 0
                    const lengthDescription = product.description.split('<wbr/>&nbsp;<wbr/>').length


                    searchArray.forEach((word) => {
                        if (product.name.toLowerCase().includes(word.toLocaleLowerCase())) ranking++;
                        rankingDescription += product.description.split('<wbr/>&nbsp;<wbr/>').filter((x: string,) => x.toLowerCase().includes(word.toLocaleLowerCase())).length;
                    })

                    ranking += rankingDescription / lengthDescription

                    product.ranking = ranking
                    delete product.description

                })

                products.sort((a: any, b: any) => b.ranking - a.ranking)

                return products as Product[];

            })
        } catch (e) {
            throw new Error("Não foi possível realizar a busca1!")
        }

    }
    async getAllNames(): Promise<string[]> {
        try {
            let products = await knex.select('p.name as name')
                .from('product as p')
            products = products.map((p: any) => p.name)
            return products;

        } catch (e) {
            throw new Error("Não foi possível realizar a busca!")
        }
    }

    async have(order_has_product: OrderHasProduct): Promise<Number> {
        const { product_id, size, color } = order_has_product
        try {
            const phc = await knex('product_has_color as phc')
                .join("color as c", "c.id", "phc.color_id")
                .join("size as s", "s.id", "phc.size_id")
                .select("phc.quantity as quantity")
                .where("phc.product_id", product_id)
                .andWhere("s.value", size)
                .andWhere("c.value", color)
                .first();

            if (phc) {
                return phc.quantity;
            }
            return 0

        } catch (error) {
            throw new Error("Não foi possível realizar a busca!")
        }
    }

    async exist(id: string): Promise<Boolean> {
        try {
            const response = await knex.first(
                knex.raw(
                    'exists ? as present',
                    knex('product').select('id').where('id', '=', id).limit(1)
                )
            );
            return response.present === 1;

        } catch (error) {
            throw new Error("Não foi possível realizar a busca!")
        }
    }


}
