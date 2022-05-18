import { Response, Request } from "express";
import { CategoryRepositoryMsql } from "../model/category-repository";


export class CategoryController{
    constructor(
        private repository = new CategoryRepositoryMsql(),

    ) { }

    public getAll = async (request: Request, response: Response) => {
        try {
            let categories = await this.repository.getAll()
            response.json(categories)
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
        
    }

}

