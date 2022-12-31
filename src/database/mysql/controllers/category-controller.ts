import { Response, Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { CreateCategory } from "../../../application/services/product/create-category";
import { logger } from "../../../logger";
import { CategoryRepositoryMsql } from "../model/category-repository";


export class CategoryController {


    constructor(
        private repository = new CategoryRepositoryMsql(),
        private createService = new CreateCategory(repository)
    ) { }

    public getAll = async (request: Request, response: Response) => {
        try {
            let categories = await this.repository.getAll()
            return response.json(categories)
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }

    }


    public createNewCategory = async (request: Request, response: Response) => {
        try {
            let props = { name: request.body.name, image: response.locals.images[0].url };
            
            const category = await this.createService.execute(props)
            await this.repository.create(category);
            return response.status(201).json({...category.props})
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }

    }

    public updateCategory = async (request: Request, response: Response) => {
        try {

            let props = { name: request.body.name, id: request.body.id, image: request.body.image };
            if (response.locals.images) {
                props.image = response.locals.images.length > 0 ? response.locals.images[0].url : props.image
            }

            const category = await this.createService.execute(props)
            await this.repository.update(category);
            return response.status(200).json({...category.props})
        } catch (error) {

            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }

    }

    public deleteCategory = async (request: Request, response: Response) => {
        try {
            const id = request.params.id;



            await this.repository.delete(id);

            return response.status(200).send();
        } catch (error) {
            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }

}


