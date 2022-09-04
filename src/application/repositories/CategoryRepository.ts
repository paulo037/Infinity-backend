import { Category } from "../../domain/entities/product/category";

export interface CategoryRepository{
    create(category: Category):Promise<null>
    update(category: Category):Promise<null>
    delete(id: string):Promise<null>
    findById(id: string): Promise<Category | null>
    findByName(name: string): Promise<Category | null>
}