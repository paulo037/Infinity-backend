import { InMemoryUserRepository } from "../../../../tests/respositories/in-momory-user-repository";
import { User } from "../../../domain/entities/user/user";
import { DeleteUser } from "./delete-user";

describe('Delete User', () => {
    it('should be able to delete User from database ', async () => {

        const userRepository = new InMemoryUserRepository;

        const user = new User({
            first_name: "Paulo",
            last_name: "Silva",
            image: "ww.exemple.com",
            password: "12345678",
            email: "exemple@gmail.com.br",
            cpf: "13210829675",
            admin: false,
            id: "1"
        });

        userRepository.items.push(user);

        const sut = new DeleteUser(userRepository);
        let response = await sut.execute({ id: "1" })
       

        expect(response).toBeNull()
    })

    it('should be able to throw an error saying the User doesnt exist', async () => {
    
        const UserRepository = new InMemoryUserRepository;
    
        const user = new User({
            first_name: "Paulo",
            image: "ww.exemple.com",
            password: "12345678",
            email: "exemple@gmail.com.br",
            cpf: "13210829675",
            admin: false,
            id: "1",
            last_name: "Silva"
        });
 
        UserRepository.items.push(user);
    
        const sut = new DeleteUser(UserRepository);
        try{
            await sut.execute({ id: "2" })
    
        }catch(e){
            expect(e).toBeTruthy()
        }
       
    
    })
})


