import { Response, Request } from "express";
import { ColorRepositoryMsql } from "../model/color-repository";

export class ColorController{
    constructor(
        private repository = new ColorRepositoryMsql(),

    ) { }

    public getAll = async (request: Request, response: Response) => {
        try {
            let colors = await this.repository.getAll()
           
            response.status(200).json(colors)
        } catch (error) {
 
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
        
    }

}
