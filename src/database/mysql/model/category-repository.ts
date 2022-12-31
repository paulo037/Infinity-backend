import { CategoryRepository } from "../../../application/repositories/CategoryRepository";
import { SizeRepository } from "../../../application/repositories/SizeRepository";
import { Category } from "../../../domain/entities/product/category";
import { Size } from "../../../domain/entities/product/size";
import knex from "../connection";


export class CategoryRepositoryMsql implements CategoryRepository {

    async create(category: Category): Promise<null> {
        try {
            await knex('category').insert(category.props);
        } catch (error) {
            throw new Error("Não foi possível criar a categoria!")
        }
        return null
    }

    async update(category: Category): Promise<null> {
        try {
            await knex('category').update(category.props).where("id", category.id);
        } catch (error) {
            throw new Error("Não foi possível atualizar a categoria!")
        }
        return null
    }

    async delete(id: string): Promise<null> {
        try {
            await knex('category').delete().where("id", id);
        } catch (error) {
            throw new Error("Não foi possível deletar a categoria!")
        }
        return null
    }

    async findById(id: string): Promise<Category | null> {

        try {

            const category = await knex('category')
                .where('category.id', id)
                .first();
            return category;

        } catch (e) {
            throw new Error("Não foi possível realizar a busca!")
        }
    }
    
    async findByName(name: string): Promise<Category | null> {
        try {

            const category = await knex('category')
                .where('category.name', name)
                .first();
            return category;

        } catch (e) {
            throw new Error("Não foi possível realizar a busca!")
        }
    }

    async getAll(): Promise<String[]> {
        try {

            let categories = await knex('category').select('*')
            return categories;

        } catch (e) {
            throw new Error("Não foi possível realizar a busca!")
        }
    }

}