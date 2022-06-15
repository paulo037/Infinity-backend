"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const in_momory_category_repository_1 = require("../../../../tests/respositories/in-momory-category-repository");
const in_momory_user_repository_1 = require("../../../../tests/respositories/in-momory-user-repository");
const user_1 = require("../../../domain/entities/user/user");
const update_user_1 = require("./update-user");
describe('Update User', () => {
    it('should be able to update a  User', async () => {
        const UserRepository = new in_momory_user_repository_1.InMemoryUserRepository;
        const categoryRepository = new in_momory_category_repository_1.InMemoryCategoryRepository;
        const u = user_1.User.create({
            first_name: "Paulo",
            last_name: "Silva",
            image: "ww.exemple.com",
            password: "12345678",
            email: "exemple@gmail.com",
            cpf: "13210829675",
            admin: false,
            id: 1,
        });
        UserRepository.items.push(u);
        const sut = new update_user_1.UpdateUser(UserRepository);
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
    });
});
