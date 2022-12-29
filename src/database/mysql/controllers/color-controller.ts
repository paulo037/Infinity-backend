import { Response, Request } from "express";
import { CreateColor } from "../../../application/services/product/create-color";
import { ColorRepositoryMsql } from "../model/color-repository";

export class ColorController{
    constructor(
        private repository = new ColorRepositoryMsql(),
        private createService = new CreateColor(repository)

    ) { }

    public getAll = async (request: Request, response: Response) => {
        try {
            let colors = await this.repository.getAll()
           
            response.status(200).json(colors)
        } catch (error) {
 
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
        
    }

    public createNewColor = async (request: Request, response: Response) => {
        try {
            let value = request.body.color;
            const color = await this.createService.execute({ value })
            await this.repository.create(color);
            response.status(201).json(color.id)
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }

    }

    public updateColor = async (request: Request, response: Response) => {
        try {
            let props = request.body.color;
            const color = await this.createService.execute(props)
            await this.repository.update(color);
            response.status(204).send()
        } catch (error) {

            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }

    }

    public deleteColor = async (request: Request, response: Response) => {
        try {
            const id = request.params.id;
    
            await this.repository.delete(id);

            response.status(200).send();
        } catch (error) {
            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }

}
