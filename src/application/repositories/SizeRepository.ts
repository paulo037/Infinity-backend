import { Size } from "../../domain/entities/product/size"



export interface SizeRepository{
    create(size: Size):Promise<null>
    update(size: Size):Promise<null>
    delete(id: string):Promise<null>
    findById(id: string): Promise<Size | null>
    findByValue(value : string): Promise<Size | null>
    getAll():Promise<Size[]>
}