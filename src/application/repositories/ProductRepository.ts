import { Product } from "../../domain/entities/product/product"

export interface ProductRepository{
    create(product: Product):Promise<null>
    update(product: Product):Promise<null>
    delete(id: number):Promise<null>
    findById(id: number): Promise<Product | null>
    findByName(name: string): Promise<Product | null>
    getByCategory(id: number):Promise<Product[]>
    getAllNames():Promise<string[]>
    getAll():Promise<Product[]>
}