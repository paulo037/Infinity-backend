
import { ColorRepository } from "../../../application/repositories/ColorRepository";
import { Color } from "../../../domain/entities/product/color";
import knex from "../connection";


export class ColorRepositoryMsql implements ColorRepository {
    create(color: Color): Promise<null> {
        throw new Error("Method not implemented.");
    }
    update(color: Color): Promise<null> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<null> {
        throw new Error("Method not implemented.");
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
            const colors = await knex('color')
            return colors;


        } catch (e) {
            throw new Error("Não foi possível realizar a busca!")
        }
    }


}
