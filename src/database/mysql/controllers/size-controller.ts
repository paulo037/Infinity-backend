import { Response, Request } from "express";
import { CreateSize } from "../../../application/services/product/create-size";
import { SizeRepositoryMsql } from "../model/size-repository";

class SizeController{
    constructor(
        private repository = new SizeRepositoryMsql(),
        private createService = new CreateSize(repository)
    ) { }

    public getAll = async (request: Request, response: Response) => {
        try {
            let sizes = await this.repository.getAll()
            response.json(sizes)
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
        
    }


    public createNewSize = async (request: Request, response: Response) => {
        try {
            let value = request.body.size;
            const size = await this.createService.execute({ value })
            await this.repository.create(size);
            response.status(201).json(size.id)
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }

    }

    public updateSize = async (request: Request, response: Response) => {
        try {
            let props = request.body.size;
            const size = await this.createService.execute(props)
            await this.repository.update(size);
            response.status(204).send()
        } catch (error) {

            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }

    }

    public deleteSize = async (request: Request, response: Response) => {
        try {
            const id = request.params.id;
    
            await this.repository.delete(id);

            response.status(200).send();
        } catch (error) {
            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }

}

export = SizeController;