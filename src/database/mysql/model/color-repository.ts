
import { ColorRepository } from "../../../application/repositories/ColorRepository";
import { Color } from "../../../domain/entities/product/color";
import knex from "../connection";


export class ColorRepositoryMsql implements ColorRepository {
    async create(color: Color): Promise<null> {
        try {
            await knex('color').insert(color);
        } catch (error) {
            throw new Error("Não foi possível criar o tamanho!")
        }
        return null
    }

    async update(color: Color): Promise<null> {
        try {
            await knex('color').update(color).where("id", color.id);
        } catch (error) {
            throw new Error("Não foi possível atualizar o tamanho!")
        }
        return null
    }

    async delete(id: string): Promise<null> {
        try {
            await knex('color').delete().where("id", id);
        } catch (error) {
            throw new Error("Não foi possível deletar o tamanho!")
        }
        return null
    }

    async findById(id: string): Promise<Color | null> {
        try {
            const color = await knex('color')
                .where('color.id', id)
                .first();
            return color;

        } catch (e) {
            throw new Error("Não foi possível realizar a busca!")
        }
    }

    async findByValue(value: string): Promise<Color | null> {
        try {

            const color = await knex('color')
                .where('color.value', value)
                .first();
            return color;

        } catch (e) {
            throw new Error("Não foi possível realizar a busca!")
        }

    }
    
    async getAll(): Promise<Color[]> {
        try {
            const colors = await knex('color').select("*")
            return colors;


        } catch (e) {
            throw new Error("Não foi possível realizar a busca!")
        }
    }


}
