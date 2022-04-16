import { CategoryRepository } from "../../src/application/repositories/CategoryRepository";
import { Category } from "../../src/domain/entities/product/category";

export class InMemoryCategoryRepository implements CategoryRepository{
    public items: Category[] = [];


    async create(category: Category): Promise<null> {
        this.items.push(category);
        return null;
    }

    async update(category: Category): Promise<null> {
        this.items.forEach((p, index) => {
            if(p.id === category.id)this.items[index] = category;
        });
        return null
    }

    async delete(id: number): Promise<null> {
        let category;

        this.items.forEach(element => {
            if (element.id === id) {
                category = this.items.splice(this.items.indexOf(element), 1)
            }

        });

        if (category) return null;

        throw new Error("produto não encontrado");

    }
    


    async findById(id: number): Promise<Category | null> {
        const category =  this.items.find(category => category.id === id);

        if(!category){
            return null;
        }

        return category;
    }

    async findByName(name: string): Promise<Category | null> {
        const category = this.items.find(category => category.name === name);

        return category ?? null;
    }


}