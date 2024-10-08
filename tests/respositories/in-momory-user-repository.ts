import { UserRepository } from "../../src/application/repositories/UserRepository";
import { Address } from "../../src/domain/entities/user/address";
import { User } from "../../src/domain/entities/user/user";

export class InMemoryUserRepository implements UserRepository {
    exist(id: string): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }
    getLenght(): Promise<number> {
        throw new Error("Method not implemented.");
    }
    updatePassword(recovery_id: string, password: string): Promise<null> {
        throw new Error("Method not implemented.");
    }
    deleteRecovery(recovery_id: string): Promise<null> {
        throw new Error("Method not implemented.");
    }
    passwordRecoveryExist(id: string): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }
    findPasswordRecovery(user_id: string): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }
    passwordRecovery(id: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    createAddress(address: Address): Promise<null> {
        throw new Error("Method not implemented.");
    }
    updateAddress(address: Address): Promise<null> {
        throw new Error("Method not implemented.");
    }
   
    getAddress(id: string, user_id: string): Promise<Address> {
        throw new Error("Method not implemented.");
    }
    
    getAddresses(user_id: string): Promise<Address[]> {
        throw new Error("Method not implemented.");
    }

    async findByCPF(cpf: string): Promise<User | undefined> {
        const user = this.items.find(user => user.cpf === cpf);
        return user;
    }

    async changeAdminPermission(id: string, adminPermission: Boolean): Promise<null> {

        const user = this.items.find(user => user.id === id);

        if (!user){
            throw new Error("usuário não encontrado");
        }

        this.items.forEach((p, index) => {
            if (p.id === user.id) this.items[index] = user;
        });

        return null;


    }
    public items: User[] = []

    async create(user: User): Promise<null> {
        this.items.push(user);
        return null;
    }

    async update(user: User): Promise<null> {
        this.items.forEach((p, index) => {
            if (p.id === user.id) this.items[index] = user;
        });
        return null
    }

    async delete(id: string): Promise<null> {
        let user;

        this.items.forEach(element => {
            if (element.id === id) {
                user = this.items.splice(this.items.indexOf(element), 1)
            }

        });

        if (user) return null;

        throw new Error("produto não encontrado");
    }

    async findById(id: string): Promise<User | undefined> {
        const user = this.items.find(user => user.id === id);
        return user;
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = this.items.find(user => user.email === email);
        return user;
    }


    async getAllUsers(page: number, limit: number,): Promise<User[]> {
        return this.items;
    }



}