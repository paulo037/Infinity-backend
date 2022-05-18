
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
    delete(id: number): Promise<null> {
        throw new Error("Method not implemented.");
    }
    async findById(id: number): Promise<Color | null> {
        const color = await knex('Ccolor')
            .where('color.id', id)
            .first();
        return color;
    }
    async findByValue(value: string): Promise<Color | null> {
        const color = await knex('color')
            .where('color.value', value)
            .first();
        return color;
    }
    async getAll(): Promise<Color[]> {
        const colors = await knex('color')
       return colors;
    }


}
