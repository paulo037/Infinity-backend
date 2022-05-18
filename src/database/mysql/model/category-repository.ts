import { CategoryRepository } from "../../../application/repositories/CategoryRepository";
import { SizeRepository } from "../../../application/repositories/SizeRepository";
import { Category } from "../../../domain/entities/product/category";
import { Size } from "../../../domain/entities/product/size";
import knex from "../connection";


export class CategoryRepositoryMsql implements CategoryRepository{
    create(category: Category): Promise<null> {
        throw new Error("Method not implemented.");
    }
    update(category: Category): Promise<null> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<null> {
        throw new Error("Method not implemented.");
    }
    async findById(id: number): Promise<Category | null> {
        const category = await knex('category')
            .where('category.id', id)
            .first();
        return category;
    }
    async findByName(name: string): Promise<Category | null> {
        const category = await knex('category')
        .where('category.name', name)
        .first();
    return category;
    }

    async getAll(): Promise<String[]> {
        let categories = await knex('category').select('*')
        return categories;
    }

}