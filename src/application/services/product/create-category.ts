import { Category } from "../../../domain/entities/product/category";
import { Validation } from "../../../domain/validation/validation";
import { CategoryRepository } from "../../repositories/CategoryRepository";

type CreateCategoryRequest = {
    name: string;
    image:string;
}


export class CreateCategory {

    constructor(
        private categoryRepository: CategoryRepository,
    ) { }



    async execute({ 
        name,
        image,}: CreateCategoryRequest) {

        const CategoryExist = await this.categoryRepository.findByName(name);
        

        Validation.notExistOrError(CategoryExist, "Uma Categoria com esse nome já existe");
        

     
        const category = Category.create({
            name,
            image,
        });

        this.categoryRepository.create(category);

    }
}