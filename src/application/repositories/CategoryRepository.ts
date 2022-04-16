import { Category } from "../../domain/entities/product/category";

export interface CategoryRepository{
    create(category: Category):Promise<null>
    update(category: Category):Promise<null>
    delete(id: number):Promise<null>
    findById(id: number): Promise<Category | null>
    findByName(name: string): Promise<Category | null>
}