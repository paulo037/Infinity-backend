"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const in_momory_user_repository_1 = require("../../../../tests/respositories/in-momory-user-repository");
const user_1 = require("../../../domain/entities/user/user");
const delete_user_1 = require("./delete-user");
describe('Delete User', () => {
    it('should be able to delete User from database ', async () => {
        const userRepository = new in_momory_user_repository_1.InMemoryUserRepository;
        const user = user_1.User.create({
            first_name: "Paulo",
            last_name: "Silva",
            image: "ww.exemple.com",
            password: "12345678",
            email: "exemple@gmail.com.br",
            cpf: "13210829675",
            admin: false,
            id: 1
        });
        userRepository.items.push(user);
        const sut = new delete_user_1.DeleteUser(userRepository);
        let response = await sut.execute({ id: 1 });
        expect(response).toBeNull();
    });
    it('should be able to throw an error saying the User doesnt exist', async () => {
        const UserRepository = new in_momory_user_repository_1.InMemoryUserRepository;
        const user = user_1.User.create({
            first_name: "Paulo",
            image: "ww.exemple.com",
            password: "12345678",
            email: "exemple@gmail.com.br",
            cpf: "13210829675",
            admin: false,
            id: 1,
            last_name: "Silva"
        });
        UserRepository.items.push(user);
        const sut = new delete_user_1.DeleteUser(UserRepository);
        try {
            await sut.execute({ id: 2 });
        }
        catch (e) {
            expect(e).toBeTruthy();
        }
    });
});
