import { ProductRepository } from "../../src/application/repositories/ProductRepository";
import { Product } from "../../src/domain/entities/product/product";


export class InMemoryProductRepository implements ProductRepository {
    create(product: Product): Promise<number> {
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
    
    async delete(id: number): Promise<null> {
        let product;

        this.items.forEach(element => {
            if (element.id === id) {
                product = this.items.splice(this.items.indexOf(element), 1)
            }

        });

        if (product) return null;

        throw new Error("produto não encontrado");

    }
    
    async findByName(name: string): Promise<Number | null> {
        const product = this.items.find(Product => Product.name === name);

        return product?.id ?? null;
    }


    async findById(id: number): Promise<Product | null> {
        const product = this.items.find(Product => Product.id === id);

        return product ?? null;
    }



    async getByCategory(id: number): Promise<Product[]> {
        return this.items
    }

    async getAllNames(): Promise<string[]> {
        return this.items.map(p => p.name);

    }


}