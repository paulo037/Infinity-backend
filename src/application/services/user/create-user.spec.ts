import { InMemoryUserRepository } from "../../../../tests/respositories/in-momory-user-repository";
import { CreateUser } from "./create-user";


describe('Create User', () => {

   

    it('should be able to create a new User', async () => {
        const UserRepository = new InMemoryUserRepository;

        const sut = new CreateUser(UserRepository);


        const response = await sut.execute({
            name: "Paulo",
            image: "ww.exemple.com",
            password: "12345678",
            confirmPassword: "12345678",
            email: "exemple@gmail.com.br",
            cpf: "13210829675",
            admin: false,
        });

        expect(response).toBeFalsy();


    })

    

    it("should be able to throw error sayng : the user with this email exist", async () => {
        const UserRepository = new InMemoryUserRepository;
 

       

        const sut = new CreateUser(UserRepository);


        const response = await sut.execute({
            name: "Paulo",
            image: "ww.exemple.com",
            password: "12345678",
            confirmPassword: "12345678",
            email: "exemple@gmail.com",
            cpf: "13210829675",
            admin: false,
        });


        try {
            const response = await sut.execute({
                name: "José",
                image: "ww.exemple.com",
                password: "12345678",
                confirmPassword: "12345678",
                email: "exemple@gmail.com",
                cpf: "13210829675",
                admin: false,
            });

        } catch(e) {
            expect(e).toBeTruthy();
        }

    })

    it("should be able to throw error saying: user email is badly formatted", async () => {
        const UserRepository = new InMemoryUserRepository;

        const sut = new CreateUser(UserRepository);


        try {
            const response = await sut.execute({
                name: "José",
                image: "ww.exemple",
                password: "12345678",
                confirmPassword: "12345678",
                email: "exemple@gmail.com",
                cpf: "13210829675",
                admin: false,
            });

        } catch (e) {
            expect(e).toBeTruthy();
        }



    })
})