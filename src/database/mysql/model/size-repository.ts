import { SizeRepository } from "../../../application/repositories/SizeRepository";
import { Size } from "../../../domain/entities/product/size";
import { logger } from "../../../logger";
import knex from "../connection";


export class SizeRepositoryMsql implements SizeRepository {
    async create(size: Size): Promise<null> {
        try {
            await knex('size').insert(size);
        } catch (error) {
            throw new Error("Não foi possível criar o tamanho!")
        }
        return null
    }

    async update(size: Size): Promise<null> {
        try {
            await knex('size').update(size).where("id", size.id);
        } catch (error) {
            throw new Error("Não foi possível atualizar o tamanho!")
        }
        return null
    }

    async delete(id: string): Promise<null> {
        try {
            await knex('size').delete().where("id", id);
        } catch (error) {
            throw new Error("Não foi possível deletar o tamanho!")
        }
        return null
    }
    async findById(id: string): Promise<Size | null> {

        try {
          
            const size = await knex('size')
                .where('size.id', id)
                .first();
            return size;

        } catch (e) {
            throw new Error("Não foi possível realizar a busca!")
        }

    }

    async findByValue(value: string): Promise<Size | null> {
        try {
            const size = await knex('size')
                .where('value', value)
                .first();
            return size; 

        } catch (e) {
            logger.error(e)
            throw new Error("Não foi possível realizar a busca!")
        }
    }
    
    async getAll(): Promise<Size[]> {
        try {
          
            const sizes = await knex('size')
            return sizes;

        } catch (e) {
            throw new Error("Não foi possível realizar a busca!")
        }
    }


}
