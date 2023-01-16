
import { Product } from "../../domain/entities/product/product"
import { Image } from "../../domain/entities/product/image"
import { ProductHasCategory } from "../../domain/entities/product/product_has_category"
import { ProductHasColor } from "../../domain/entities/product/product_has_color"
import { OrderHasProduct } from "../../domain/entities/order/order_has_product"

export interface ProductRepository {
    create(product: Product, colors: ProductHasColor[], categories: ProductHasCategory[], createImages: Image[]): Promise<null>
    update(product: Product, colors: ProductHasColor[], categories: ProductHasCategory[], createImages: Image[], deleteImages: Image[], updateImages: Image[]): Promise<null>
    delete(id: string): Promise<null>
    findById(id: string): Promise<Product | null>
    get(id: string): Promise<Product | undefined> 
    findByName(name: string): Promise<string | null>
    getByCategory(id: string): Promise<Product[]>
    search(term: string): Promise<Product[]>
    getAllNames(): Promise<string[]>
    getAll(page: number, limit: number): Promise<Product[]>
    getLenght(): Promise<number>
    updateColor(colors: ProductHasColor[], product_id: string): Promise<null> 
    updateCategories(categories: ProductHasCategory[], product_id: string): Promise<null> 
    createImages(images: Image[]): Promise<null>
    deleteImages(images: Image[]): Promise<null>
    have(order_has_product : OrderHasProduct): Promise<Number>
    getLenght(): Promise<number>
    exist(id: string): Promise<Boolean>
}