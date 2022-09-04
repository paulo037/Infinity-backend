import { InMemoryUserRepository } from "../../../../tests/respositories/in-momory-user-repository";
import { User } from "../../../domain/entities/user/user";
import { ChangeAdminPermission } from "./change-admin-permission";
import { FindUserByEmail } from "./find-user-by-email ";

describe('Change user permission', () => {



    it('should be able to change user permission', async () => {
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


        const sut = new ChangeAdminPermission(UserRepository);



        const response = await sut.execute("1", true);


        expect(response).toBeFalsy();
    });




    it('should be able to throw an error saying user doesnt exist', async () => {
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
        const sut = new ChangeAdminPermission(UserRepository);

        try {

            const response = await sut.execute("2", true);


        } catch (error) {
            expect(error).toBeTruthy();

        }



    });


})