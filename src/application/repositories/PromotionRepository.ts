import { Promotion } from "../../domain/entities/promotion/promotion"



export interface PromotionRepository{
    create(size: Promotion):Promise<null>
    update(size: Promotion):Promise<null>
    delete(id: string):Promise<null>
    getAll():Promise<Promotion[]>
    getByDate(date: Date):Promise<Promotion[]>
    findById(id: string): Promise<Promotion | null>
}