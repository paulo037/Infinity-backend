import { ProductRepository } from "../../src/application/repositories/ProductRepository";
import { OrderHasProduct } from "../../src/domain/entities/order/order_has_product";
import { Image } from "../../src/domain/entities/product/image";
import { Product } from "../../src/domain/entities/product/product";
import { ProductHasCategory } from "../../src/domain/entities/product/product_has_category";
import { ProductHasColor } from "../../src/domain/entities/product/product_has_color";


export class InMemoryProductRepository implements ProductRepository {
    have(order_has_product: OrderHasProduct): Promise<Number> {
        throw new Error("Method not implemented.");
    }

    
    updateColor(colors: ProductHasColor[], product_id: string): Promise<null> {
        throw new Error("Method not implemented.");
    }
    updateCategories(categories: ProductHasCategory[], product_id: string): Promise<null> {
        throw new Error("Method not implemented.");
    }
    updateImages(images: Image[], product_id: string): Promise<null> {
        throw new Error("Method not implemented.");
    }
    create(product: Product): Promise<null> {
        throw new Error("Method not implemented.");
    }
    
    search(term: string): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
 
    getAll(page: number, limit: number): Promise<Product[]> {
        throw new Error("Method not implemented.");
    }
    getLenght(): Promise<number> {
        throw new Error("Method not implemented.");
    }
   

    public items: Product[] = []


    
    async update(product: Product): Promise<null> {
        this.items.forEach((p, index) => {
            if(p.id === product.id)this.items[index] = product;
        });
        return null
    }
    
    async delete(id: string): Promise<null> {
        let product;

        this.items.forEach(element => {
            if (element.id === id) {
                product = this.items.splice(this.items.indexOf(element), 1)
            }

        });

        if (product) return null;

        throw new Error("produto não encontrado");

    }
    
    async findByName(name: string): Promise<string | null> {
        const product = this.items.find(Product => Product.name === name);

        return product?.id ?? null;
    }


    async findById(id: string): Promise<Product | null> {
        const product = this.items.find(Product => Product.id === id);

        return product ?? null;
    }



    async getByCategory(id: string): Promise<Product[]> {
        return this.items
    }

    async getAllNames(): Promise<string[]> {
        return this.items.map(p => p.name);

    }


}