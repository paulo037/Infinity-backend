import { Response, Request } from "express";
import { CreateProduct } from "../../../application/services/product/create-product";
import { GetProductById } from "../../../application/services/product/get-product-by-id";
import { UpdateProduct } from "../../../application/services/product/update-product";
import { ProductRepositoryMsql } from "../model/product-repository";
import formidable from 'formidable'
import multer from 'multer'


export class ProductController {


    constructor(
        private repository = new ProductRepositoryMsql(),
        private create = new CreateProduct(repository),
        private update = new UpdateProduct(repository),
        private getProductId = new GetProductById(repository),

    ) { }

    public createProduct = async (request: Request, response: Response) => {
        try {
            await this.create.execute({ ...request.body.product })
        } catch (error) {
            response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
        response.status(201).send()
    }

    public updateProduct = async (request: Request, response: Response) => {
        let product = request.body.product;
        product.id = request.params.id
        console.log('ok')
        try {
            await this.update.execute(product);
        } catch (error) {
            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
        response.status(201).send();
    }

    public getProductById = async (request: Request, response: Response) => {
        let id = parseInt(request.params.id)
        try {
            const product = await this.getProductId.execute({ id })
            return response.json(product);
        } catch (error) {
            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }

    public getAll = async (request: Request, response: Response) => {
        try {
            const products = await this.repository.getAll();
            return response.json(products);
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }

    public uploadImage = async (request: Request, response: Response) => {
       console.log()
       console.log(response.locals.images)
       response.json(response.locals.images)
    }
}

