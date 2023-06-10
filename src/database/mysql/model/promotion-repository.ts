import { PromotionRepository } from "../../../application/repositories/PromotionRepository";
import { Promotion } from "../../../domain/entities/promotion/promotion";
import { logger } from "../../../logger";
import knex from "../connection";


export class PromotionRepositoryMsql implements PromotionRepository {
    async getByDate(date: Date): Promise<Promotion[]> {
        let promotions = [] 
        try {
            promotions = await knex('promotion')
                .where('startDate', '<=', date)
                .andWhere('endDate', '>=', date)
                .andWhere('deleted', false);

        } catch (error) {
            
            throw new Error("Não foi possível criar a promoção!")
        }
        return promotions as Promotion[];
    }
    findByValue(value: string): Promise<Promotion | null> {
        throw new Error("Method not implemented.");
    }
    async create(Promotion: Promotion): Promise<null> {
        try {
            await knex('promotion').insert(Promotion);
        } catch (error) {
            throw new Error("Não foi possível criar a promoção!")
        }
        return null
    }

    async update(promotion: Promotion): Promise<null> {
        try {
            await knex('promotion').update(promotion).where("id", promotion.id);
        } catch (error) {
            throw new Error("Não foi possível atualizar a promoção!")
        }
        return null
    }

    async delete(id: string): Promise<null> {
        try {
            await knex('promotion').update({ deleted: true }).where("id", id);
        } catch (error) {
            
            throw new Error("Não foi possível deletar a promoção!")
        }
        return null
    }

    async findById(id: string): Promise<Promotion | null> {

        try {

            const Promotion = await knex('Promotion')
                .where('Promotion.id', id)
                .andWhere('Promotion.deleted', false)
                .first();
            return Promotion;

        } catch (e) {
            throw new Error("Não foi possível realizar a busca!")
        }

    }


    async getAll(): Promise<Promotion[]> {
        try {

            const promotions = await knex('promotion')
                .join('category as c1', 'c1.id', 'buying_category_id')
                .join('category as c2', 'c2.id', 'win_category_id')
                .select("promotion.id as id",
                    "promotion.name as name",
                    "promotion.buying_category_id as buying_category_id",
                    "promotion.buying_quantity as buying_quantity",
                    "promotion.win_category_id as win_category_id",
                    "promotion.win_quantity as win_quantity",
                    "promotion.startDate as startDate",
                    "promotion.endDate as endDate",
                    "c1.name as buying_category",
                    "c2.name as win_category"
                ).where('promotion.deleted', false);

            return promotions;

        } catch (e) {
            throw new Error("Não foi possível realizar a busca!")
        }
    }


}
