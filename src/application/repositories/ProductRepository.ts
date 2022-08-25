
import { Product } from "../../domain/entities/product/product"

export interface ProductRepository {
    create(product: Product): Promise<number>
    update(product: Product): Promise<null>
    delete(id: number): Promise<null>
    findById(id: number): Promise<Product | null>
    findByName(name: string): Promise<Number | null>
    getByCategory(id: number): Promise<Product[]>
    search(term: string): Promise<Product[]>
    getAllNames(): Promise<string[]>
    getAll(page: number, limit: number): Promise<Product[]>
    getLenght(): Promise<number>
}