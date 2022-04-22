

// type GetProductByCategoryRequest = {
//     id: number;
// }


// export class GetProductByCategory {

//     constructor(
//         private productRepository: ProductRepository,
//         private imagesRepository: CategoryRepository,
//     ) { }

//     async execute({ id }: GetProductByCategoryRequest) {

//         const category = await this.categoryRepository.findById(id)
//         Validation.existOrError(category, "Categoria não encontrada");
      
//         return this.productRepository.getByCategory(id)

        
//     }
// }