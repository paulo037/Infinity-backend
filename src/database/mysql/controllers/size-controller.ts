import { Response, Request } from "express";
import { SizeRepositoryMsql } from "../model/size-repository";

class SizeController{
    constructor(
        private repository = new SizeRepositoryMsql(),

    ) { }

    public getAll = async (request: Request, response: Response) => {
        try {
            let sizes = await this.repository.getAll()
            response.json(sizes)
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
        
    }

}

export = SizeController;