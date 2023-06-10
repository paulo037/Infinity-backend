import { Response, Request } from "express";
import { Promotion } from "../../../domain/entities/promotion/promotion";
import { PromotionRepositoryMsql } from "../model/promotion-repository";

export class PromotionController{
    constructor(
        private repository = new PromotionRepositoryMsql(),
        // private createService = new CreateSize(repository)
    ) { }

    public getAll = async (request: Request, response: Response) => {
        try {
            let promotions = await this.repository.getAll()
            return response.json(promotions)
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
        
    }

    public getbyDate = async (request: Request, response: Response) => {
        try {
            let promotions = await this.repository.getByDate(new Date())
            return response.json(promotions)
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
        
    }


    public createPromotion = async (request: Request, response: Response) => {
        try {
            let props = request.body.promotion;
            props.startDate = new Date(props.startDate)
            props.endDate = new Date(props.endDate)
            const promotion = new Promotion(props)
           
            await this.repository.create(promotion);
            return response.status(201).json(promotion.id)
        } catch (error) {
            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }

    }

    public update = async (request: Request, response: Response) => {
        try {
            let props = request.body.promotion;
            props.startDate = new Date(props.startDate)
            props.endDate = new Date(props.endDate)
            const promotion = new Promotion(props)
            // const size = await this.createService.execute(props)
            await this.repository.update(promotion);
            return response.status(204).send()
        } catch (error) {

            return response.status(500).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }

    }

    public delete = async (request: Request, response: Response) => {
        try {
            const id = request.params.id;
    
            await this.repository.delete(id);

            return response.status(200).send();
        } catch (error) {
            return response.status(400).send(error instanceof Error ? error.message : "Houve um erro inesperado");
        }
    }

}

