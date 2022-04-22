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
    findById(id: number): Promise<Size | null> {
        throw new Error("Method not implemented.");
    }
    findByValue(value: string): Promise<Size | null> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<String[]> {
        const sizes = await knex('size').select('value')
        let sizesArray : string[]
        sizesArray = []
        sizes.forEach((v, index) => sizesArray.push(v.value))
        return sizesArray;
    }
    

}
