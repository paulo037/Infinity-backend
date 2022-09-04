import { InMemoryUserRepository } from "../../../../tests/respositories/in-momory-user-repository";
import { User } from "../../../domain/entities/user/user";
import { FindUserByEmail } from "./find-user-by-email ";

describe('Find User by email', () => {



    it('should be able to find a  User by email', async () => {
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


        const sut = new FindUserByEmail(UserRepository);



        const response = await sut.execute('exemple@gmail.com')


        expect(response).toBeTruthy();
    });






    it('should be able to throw an error saying user email is badly formatted', async () => {
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



        const sut = new FindUserByEmail(UserRepository);



        try {

            const response = await sut.execute('exemplegmail.com')

        } catch (error) {

            expect(error).toBeTruthy();
        }




    })



    it('should be able to throw an error saying not found the profile with this email', async () => {
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



        const sut = new FindUserByEmail(UserRepository);



        try {

            const response = await sut.execute('error@gmail.com')

        } catch (error) {

            expect(error).toBeTruthy();
        }

    })
})