import { Response, Request } from "express";
import { CreateProduct, CreateProductRequest } from "../../../application/services/product/create-product";
import { DeleteProduct } from "../../../application/services/product/delete-product";
import { GetProductById } from "../../../application/services/product/get-product-by-id";
import { UpdateProduct, UpdateProductRequest } from "../../../application/services/product/update-product";
import { ProductRepositoryMsql } from "../model/product-repository";
import { SizeRepositoryMsql } from "../model/size-repository";
import { CategoryRepositoryMsql } from "../model/category-repository";
import { GetProductByCategory } from "../../../application/services/product/get-products-by-category";
import { Image } from "../../../domain/entities/product/image";
import { Product } from "../../../domain/entities/product/product";
import { CreateProductHasColorRequest } from "../../../application/services/product/create-product-has-color";
import { CreateProductHasCategoryRequest } from "../../../application/services/product/create-product-has-category";
import { deleteImage } from "../../../application/config/cloudinary/uploader";

export class ProductController {


    constructor(
        private repository = new ProductRepositoryMsql(),
        private sizerepository = new SizeRepositoryMsql(),
        private categoryrepository = new CategoryRepositoryMsql(),

        private create = new CreateProduct(repository, sizerepository, categoryrepository),
        private deleteProduct = new DeleteProduct(repository),
        private update = new UpdateProduct(repository, sizerepository, categoryrepository),
        private getProductId = new GetProductById(repository),
        private getProductByCategory = new GetProductByCategory(repository, categoryrepository)
    ) { }





    public createProduct = async (request: Request, response: Response) => {

        const createImages: Image[] = response.locals.createImages ?? [];

        const colors: CreateProductHasColorRequest[] = request.body.colors ? JSON.parse(request.body.colors) : [];
        const categories: CreateProductHasCategoryRequest[] = request.body.categories ? JSON.parse(request.body.categories) : [];
        const product: Product = request.body.product;


        try {
            const createProductRequest: CreateProductRequest = { product, createImages, colors, categories };
            console.log(createProductRequest);
            await this.create.execute(createProductRequest);

        } catch (error) {

            for await (const image of createImages) {
                deleteImage(image.key).catch();
            }
            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
        return response.status(200).send();
    }

    public updateProduct = async (request: Request, response: Response) => {

        const deleteImages: Image[] = request.body.deleteImages ? JSON.parse(request.body.deleteImages) : [];
        const createImages: Image[] = response.locals.createImages ?? [];
        const updateImages: Image[] = request.body.updateImages ? JSON.parse(request.body.updateImages) : [];
        const colors: CreateProductHasColorRequest[] = request.body.colors ? JSON.parse(request.body.colors) : [];
        const categories: CreateProductHasCategoryRequest[] = request.body.categories ? JSON.parse(request.body.categories) : [];
        const product: Product = request.body.product;
        console.log('imagens prontas')
        try {
            const updateProductRequest: UpdateProductRequest = { product, createImages, deleteImages, updateImages, colors, categories };
           
            await this.update.execute(updateProductRequest);
            for await (const image of deleteImages) {
                await deleteImage(image.key)
            }

        } catch (error) {
            for await (const image of createImages) {
                deleteImage(image.key).catch();
            }
            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
        return response.status(200).send();
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
        let id = request.params.id;
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

            return response.json({ id: id });
        } catch (error) {
            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }

    public getProductByCategoryName = async (request: Request, response: Response) => {
        let name = request.params.name;
        try {
            const products = await this.getProductByCategory.execute({ name })

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
        const image = response.locals.images
        return response.json(image)
    }



}

