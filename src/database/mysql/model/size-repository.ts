import { SizeRepository } from "../../../application/repositories/SizeRepository";
import { Size } from "../../../domain/entities/product/size";
import knex from "../connection";


export class SizeRepositoryMsql implements SizeRepository {
    create(size: Size): Promise<null> {
        throw new Error("Method not implemented.");
    }
    update(size: Size): Promise<null> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<null> {
        throw new Error("Method not implemented.");
    }
    async findById(id: number): Promise<Size | null> {

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
                .where('size.value', value)
                .first();
            return size; 

        } catch (e) {
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
