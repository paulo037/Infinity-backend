"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const in_momory_user_repository_1 = require("../../../../tests/respositories/in-momory-user-repository");
const create_user_1 = require("./create-user");
describe('Create User', () => {
    it('should be able to create a new User', async () => {
        const UserRepository = new in_momory_user_repository_1.InMemoryUserRepository;
        const sut = new create_user_1.CreateUser(UserRepository);
        const response = await sut.execute({
            first_name: "Paulo",
            last_name: "Silva",
            image: "ww.exemple.com",
            password: "12345678",
            confirmPassword: "12345678",
            email: "exemple@gmail.com.br",
            cpf: "13210829675",
            admin: false,
        });
        expect(response).toBeFalsy();
    });
    it("should be able to throw error sayng : the user with this email exist", async () => {
        const UserRepository = new in_momory_user_repository_1.InMemoryUserRepository;
        const sut = new create_user_1.CreateUser(UserRepository);
        const response = await sut.execute({
            first_name: "Paulo",
            last_name: "Silva",
            image: "ww.exemple.com",
            password: "12345678",
            confirmPassword: "12345678",
            email: "exemple@gmail.com",
            cpf: "13210829675",
            admin: false,
        });
        try {
            const response = await sut.execute({
                first_name: "José",
                last_name: "Silva",
                image: "ww.exemple.com",
                password: "12345678",
                confirmPassword: "12345678",
                email: "exemple@gmail.com",
                cpf: "13210829675",
                admin: false,
            });
        }
        catch (e) {
            expect(e).toBeTruthy();
        }
    });
    it("should be able to throw error saying: user email is badly formatted", async () => {
        const UserRepository = new in_momory_user_repository_1.InMemoryUserRepository;
        const sut = new create_user_1.CreateUser(UserRepository);
        try {
            const response = await sut.execute({
                first_name: "Paulo",
                last_name: "Silva",
                image: "ww.exemple",
                password: "12345678",
                confirmPassword: "12345678",
                email: "exemple@gmail.com",
                cpf: "13210829675",
                admin: false,
            });
        }
        catch (e) {
            expect(e).toBeTruthy();
        }
    });
});
