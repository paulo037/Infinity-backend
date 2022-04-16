import { Size } from "../../domain/entities/product/size"



export interface SizeRepository{
    create(size: Size):Promise<null>
    update(size: Size):Promise<null>
    delete(id: number):Promise<null>
    findById(id: number): Promise<Size | null>
    findByValue(value : string): Promise<Size | null>
}