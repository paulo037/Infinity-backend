import { Color } from "../../domain/entities/product/color"


export interface ColorRepository{
    create(Color: Color):Promise<null>
    update(Color: Color):Promise<null>
    delete(id: number):Promise<null>
    findById(id: number): Promise<Color | null>
    findByValue(value : string): Promise<Color | null>
    getAll():Promise<Color[]>
}