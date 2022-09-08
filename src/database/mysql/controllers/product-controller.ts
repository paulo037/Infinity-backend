import { Response, Request } from "express";
import { CreateProduct } from "../../../application/services/product/create-product";
import { DeleteProduct } from "../../../application/services/product/delete-product";
import { GetProductById } from "../../../application/services/product/get-product-by-id";
import { UpdateProduct } from "../../../application/services/product/update-product";
import { ProductRepositoryMsql } from "../model/product-repository";
import { SizeRepositoryMsql } from "../model/size-repository";
import { CreateProductHasCategory } from "../../../application/services/product/create-product-has-category";
import { CategoryRepositoryMsql } from "../model/category-repository";
import { GetProductByCategory } from "../../../application/services/product/get-products-by-category";
import { CreateProductHasColor } from "../../../application/services/product/create-product-has-color";
import { Image } from "../../../domain/entities/product/image";
import { Category } from "../../../domain/entities/product/category";
import { ProductHasCategory } from "../../../domain/entities/product/product_has_category";
import { Color } from "../../../domain/entities/product/color";
import { ProductHasColor } from "../../../domain/entities/product/product_has_color";
import { JwtPayload } from "../../../application/config/auth";
import { mercadopago } from "../../../application/config/mercadopago";
import { FindUserByEmail } from "../../../application/services/user/find-user-by-email ";

export class ProductController {


    constructor(
        private repository = new ProductRepositoryMsql(),
        private sizerepository = new SizeRepositoryMsql(),
        private categoryrepository = new CategoryRepositoryMsql(),
        private create = new CreateProduct(repository),
        private deleteProduct = new DeleteProduct(repository),
        private createProductHasColor = new CreateProductHasColor(sizerepository, repository),
        private createProductHasCategory = new CreateProductHasCategory(categoryrepository, repository),
        private update = new UpdateProduct(repository),
        private getProductId = new GetProductById(repository),
        private getProductByCategory = new GetProductByCategory(repository, categoryrepository)
    ) { }

    private createImages = (images: Image[] | undefined, product_id: string) => {

        if (images) {
            const addProductId = images.map((img: any) => {
                img.product_id = product_id
                return img;
            });

            return addProductId;
        }

        return [];
    }

    private createCategories = async (categories: Category[] | undefined, product_id: string)
        : Promise<ProductHasCategory[]> => {
        let productHasCategory = []
        if (categories) {
            for await (const [index, category] of categories.entries()) {
                const c = await this.createProductHasCategory.execute({
                    product_id: product_id,
                    category_name: category.name
                });

                productHasCategory.push(c);
            }
            return productHasCategory;
        }
        return [];

    }


    private createColor = async (colors: {
        color_id: string,
        quantity: number,
        size_id: string
    }[] | undefined, product_id: string)
        : Promise<ProductHasColor[]> => {
        let productHasColor = []
        if (colors) {
            for await (const [index, color] of colors.entries()) {
                const c = await this.createProductHasColor.execute({
                    product_id: product_id,
                    color_id: color.color_id,
                    quantity: color.quantity,
                    size_id: color.size_id
                });

                productHasColor.push(c);
            }
            return productHasColor;
        }
        return [];

    }

    public createProduct = async (request: Request, response: Response) => {
        let product = request.body.product;
        try {
            product.id = await this.create.execute(product);

            let images = this.createImages(product.images, product.id);
            let categories = await this.createCategories(product.categories, product.id);
            let colors = await this.createColor(product.colors, product.id)

            await this.repository.updateImages(images, product.id);
            await this.repository.updateColor(colors, product.id);
            await this.repository.updateCategories(categories, product.id);

        } catch (error) {

            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
        response.status(201).send();
    }

    public updateProduct = async (request: Request, response: Response) => {
        let product = request.body.product;
       
        try {
            let images = this.createImages(product.images, product.id);
            let categories = await this.createCategories(product.categories, product.id);
            let colors = await this.createColor(product.colors, product.id)

            await this.update.execute(product);
            await this.repository.updateImages(images, product.id);
            await this.repository.updateColor(colors, product.id);
            await this.repository.updateCategories(categories, product.id);

        } catch (error) {

            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
        response.status(200).send();
    }

    public delete = async (request: Request, response: Response) => {
        let id = request.params.id;
        try {
            this.deleteProduct.execute({ id })
        } catch (error) {
            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
        return response.status(200).send();
    }

    public getProductById = async (request: Request, response: Response) => {
        let id =request.params.id;
        try {
            const product = await this.getProductId.execute(id)
            return response.json(product);
        } catch (error) {
            
            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }

    public getProductByName = async (request: Request, response: Response) => {
        let name = request.params.name;

        try {
            const id = await this.repository.findByName(name)

            return response.json({id: id});
        } catch (error) {
            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }

    public getProductByCategoryId = async (request: Request, response: Response) => {
        let id =request.params.id;
        try {
            const products = await this.getProductByCategory.execute({ id })

            return response.json(products);
        } catch (error) {
           
            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }

    public getAll = async (request: Request, response: Response) => {
        const limit = request.query.limit as unknown as number;
        const page = request.query.page as unknown as number;
        try {
            const products = await this.repository.getAll(page, limit);
            const count = await this.repository.getLenght()

            return response.json({ products, count });
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }

    public search = async (request: Request, response: Response) => {
        let search = request.params.term;

        try {
            const products = await this.repository.search(search)

            return response.json(products);
        } catch (error) {

            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }

    public autoComplete = async (request: Request, response: Response) => {
        try {
            const products = await this.repository.getAllNames()
            return response.json(products);
        } catch (error) {

            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }

    public uploadImage = async (request: Request, response: Response) => {
        const image = request.body.stillRemain
        return response.json(image)
    }



}

