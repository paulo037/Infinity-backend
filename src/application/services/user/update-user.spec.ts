import { InMemoryCategoryRepository } from "../../../../tests/respositories/in-momory-category-repository";
import { InMemoryUserRepository } from "../../../../tests/respositories/in-momory-user-repository";
import { User } from "../../../domain/entities/user/user";
import { UpdateUser } from "./update-user";

describe('Update User', () => {



    it('should be able to update a  User', async () => {
        const UserRepository = new InMemoryUserRepository;


        const u = User.create({
            first_name: "Paulo",
            last_name: "Silva",
            image: "ww.exemple.com",
            password: "12345678",
            email: "exemple@gmail.com",
            cpf: "13210829675",
            admin: false,
            id: "1",
        });


        UserRepository.items.push(u)


        const sut = new UpdateUser(UserRepository);



        const response = await sut.execute({
            first_name: "Paulo",
            last_name: "silva",
            image: "ww.exemple.com",
            email: "exemple@gmail.com",
            cpf: "13210829675",
            id: "1"
        });

        expect(response).toBeFalsy();


    })


    it('should be able to throw an error saying the User doesnt exist', async () => {
        const UserRepository = new InMemoryUserRepository;


        const u = User.create({
            first_name: "Paulo",
            last_name: "Silva",
            image: "ww.exemple.com",
            password: "12345678",
            email: "exemple@gmail.com",
            cpf: "13210829675",
            admin: false,
            id: "1",
        });


        UserRepository.items.push(u)


        const sut = new UpdateUser(UserRepository);

        try {
            const response = await sut.execute({
                first_name: "Paulo",
                last_name: "silva",
                image: "ww.exemple.com",
                email: "exemple@gmail.com",
                cpf: "13210829675",
                id: "2"
            });

        } catch (error) {

            expect(error).toBeTruthy();
        }




    })



    it('should be able to throw an error saying the name of User not informed', async () => {
        const UserRepository = new InMemoryUserRepository;


        const u = User.create({
            first_name: "Paulo",
            last_name: "Silva",
            image: "ww.exemple.com",
            password: "12345678",
            email: "exemple@gmail.com",
            cpf: "13210829675",
            admin: false,
            id: "1",
        });


        UserRepository.items.push(u)


        const sut = new UpdateUser(UserRepository);

        try {
            const response = await sut.execute({
                first_name: "",
                last_name: "silva",
                image: "ww.exemple.com",
                email: "exemple@gmail.com",
                cpf: "13210829675",
                id: "2"
            });

        } catch (error) {

            expect(error).toBeTruthy();
        }


    })
})