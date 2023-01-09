
import { Product } from "../../domain/entities/product/product"
import { Image } from "../../domain/entities/product/image"
import { ProductHasCategory } from "../../domain/entities/product/product_has_category"
import { ProductHasColor } from "../../domain/entities/product/product_has_color"
import { OrderHasProduct } from "../../domain/entities/order/order_has_product"

export interface ProductRepository {
    create(product: Product): Promise<null>
    update(product: Product): Promise<null>
    delete(id: string): Promise<null>
    findById(id: string): Promise<Product | null>
    findByName(name: string): Promise<string | null>
    getByCategory(id: string): Promise<Product[]>
    search(term: string): Promise<Product[]>
    getAllNames(): Promise<string[]>
    getAll(page: number, limit: number): Promise<Product[]>
    getLenght(): Promise<number>
    updateColor(colors: ProductHasColor[], product_id: string): Promise<null> 
    updateCategories(categories: ProductHasCategory[], product_id: string): Promise<null> 
    updateImages(images: Image[], product_id: string): Promise<null>
    have(order_has_product : OrderHasProduct): Promise<Number>
    getLenght(): Promise<number>
}