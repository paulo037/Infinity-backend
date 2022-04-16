import { SizeRepository } from "../../src/application/repositories/SizeRepository";
import { Size } from "../../src/domain/entities/product/size";

export class InMemorySizeRepository implements SizeRepository{

    public items: Size[] = [];


    async create(size: Size): Promise<null> {
        this.items.push(size);
        return null;
    }

    async update(size: Size): Promise<null> {
        this.items.forEach((s, index) => {
            if(s.id === size.id)this.items[index] = size;
        });
        return null
    }

    async delete(id: number): Promise<null> {
        let size;

        this.items.forEach(element => {
            if (element.id === id) {
                size = this.items.splice(this.items.indexOf(element), 1)
            }

        });

        if (size) return null;

        throw new Error("produto não encontrado");

    }
    


    async findById(id: number): Promise<Size | null> {
        const Size =  this.items.find(Size => Size.id === id);

        if(!Size){
            return null;
        }

        return Size;
    }

    async findByValue(value: string): Promise<Size | null> {
        const Size = this.items.find(size => size.value === value);

        return Size ?? null;
    }


}