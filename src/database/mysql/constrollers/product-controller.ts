import { Response, Request } from "express";
import { CreateProduct } from "../../../application/services/product/create-product";
import { GetProductById } from "../../../application/services/product/get-product-by-id";
import { UpdateProduct } from "../../../application/services/product/update-product";
import { ProductRepositoryMsql } from "../model/product-repository";
import formidable from 'formidable'
import multer from 'multer'
import { Image } from "../../../domain/entities/product/image";
import { CreateSize } from "../../../application/services/product/create-size";
import { SizeRepositoryMsql } from "../model/size-repository";
import { CreateProductHasSize } from "../../../application/services/product/create-product-has-size";
import { ProductHasSize } from "../../../domain/entities/product/product_has_size";


export class ProductController {


    constructor(
        private repository = new ProductRepositoryMsql(),
        private sizerepository = new SizeRepositoryMsql(),
        private create = new CreateProduct(repository),
        private createProductHasSize = new CreateProductHasSize(sizerepository, repository),
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
        let sizes = product.sizes;
        let categories = product.categories;
        let images = product.images;
        // delete product.sizes;
        // delete product.categories;
        // delete product.images;

        const addProductId = images.map((img: any) => {
            img.product_id = product.id
            return img;
        });

        images = addProductId;
        console.log("aqui \n"+ JSON.stringify(images))
        

        try {
            for await (const [index, size] of sizes.entries()) {
                const s = await this.createProductHasSize.execute({
                    size_value: size.size,
                    product_id: product.id,
                    quantity: size.quantity
                });

                sizes[index] = { ...s.props };
            }


            await this.repository.updateSize(sizes, product.id);
            await this.repository.updateImages(images, product.id);

            await this.update.execute(product);

        } catch (error) {
            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
        console.log("update")
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

        const image = request.body.stillRemain
        console.log(image)
        return response.json(image)
    }
}

