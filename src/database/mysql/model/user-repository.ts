import knex from "../connection";
import { UserRepository } from "../../../application/repositories/UserRepository";
import { User } from "../../../domain/entities/user/user";


export class UserRepositoryMysql implements UserRepository {
    async changeAdminPermission(id: number, adminPermission: Boolean): Promise<null> {
        await knex('user')
            .update('user.admin', adminPermission)
            .where({id: id})
        return null;
    }
    create(user: User): Promise<null> {
        throw new Error("Method not implemented.");
    }
    update(user: User): Promise<null> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<null> {
        throw new Error("Method not implemented.");
    }
    findById(id: number): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    findByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    async getAllUsers(): Promise<User[]> {
        const users = await knex('user')
            .select('first_name', 'admin', 'email', 'id')
        return users;
    }
    

}
