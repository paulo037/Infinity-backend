import { Category } from "../../../domain/entities/product/category";
import { Validation } from "../../../domain/validation/validation";
import { CategoryRepository } from "../../repositories/CategoryRepository";

type CreateCategoryRequest = {
    name: string;
    image: string;
    id?: string
}


export class CreateCategory {

    constructor(
        private categoryRepository: CategoryRepository,
    ) { }




    public async execute({
        name,
        image,
        id }: CreateCategoryRequest) {

        const CategoryExist = await this.categoryRepository.findByName(name);

        try {
            Validation.notExistOrError(CategoryExist, "Uma Categoria com esse nome já existe");
        } catch (error) {
            Validation.equalsOrError(id, CategoryExist?.id, "Uma Categoria com esse nome já existe")
        }



        const category = new Category({
            name,
            image,
            id
        });

        return category

    }
}