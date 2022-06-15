import { InMemoryCategoryRepository } from "../../../../tests/respositories/in-momory-category-repository";
import { InMemoryUserRepository } from "../../../../tests/respositories/in-momory-user-repository";
import { User } from "../../../domain/entities/user/user";
import { UpdateUser } from "./update-user";

describe('Update User', () => {

   

    it('should be able to update a  User', async () => {
        const UserRepository = new InMemoryUserRepository;
        const categoryRepository = new InMemoryCategoryRepository;
        

        const u =  User.create({
            first_name: "Paulo",
            last_name: "Silva",
            image: "ww.exemple.com",
            password: "12345678",
            email: "exemple@gmail.com",
            cpf: "13210829675",
            admin: false,
            id: 1,
        });


        UserRepository.items.push(u)


        const sut = new UpdateUser(UserRepository);



        const response = await sut.execute({
            first_name: "Paulo",
            last_name: "silva",
            image: "ww.exemple.com",
            password: "12345678",
            confirmPassword: "12345678",
            email: "exemple@gmail.com",
            cpf: "13210829675",
            admin: false,
            id: 1
        });

        expect(response).toBeFalsy();


    })

 

  
})