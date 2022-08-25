import { UserRepository } from "../../src/application/repositories/UserRepository";
import { User } from "../../src/domain/entities/user/user";

export class InMemoryUserRepository implements UserRepository {

    async findByCPF(cpf: string): Promise<User | null>  {
        const user = this.items.find(user => user.props.cpf === cpf);
        return user ?? null;
    }
    
    changeAdminPermission(id: number, adminPermission: Boolean): Promise<null> {
        throw new Error("Method not implemented.");
    }
    public items: User[] = []
    
    async create(user: User): Promise<null> {
        this.items.push(user);
        return null;
    }
    
    async update(user: User): Promise<null> {
        this.items.forEach((p, index) => {
            if(p.id === user.id)this.items[index] = user;
        });
        return null
    }

    async delete(id: number): Promise<null> {
        let user;

        this.items.forEach(element => {
            if (element.id === id) {
                user = this.items.splice(this.items.indexOf(element), 1)
            }

        });

        if (user) return null;

        throw new Error("produto não encontrado");
    }

    async findById(id: number): Promise<User | null> {
        const user = this.items.find(user => user.id === id);
        return user ?? null;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.items.find(user => user.email === email);
        return user ?? null;
    }


    async getAllUsers(): Promise<User[]> {
        return this.items;
    }

   

}