import { UserRepository } from "../../application/repositories/UserRepository";
import { User } from "../../domain/entities/user/user";
import knex from "../connection";

class UserController implements UserRepository{
    async create(user: User): Promise<null> {
        throw new Error("Method not implemented.");
    }
    async update(user: User): Promise<null> {
        throw new Error("Method not implemented.");
    }
    async delete(id: number): Promise<null> {
        throw new Error("Method not implemented.");
    }
    async findById(id: number): Promise<User | null> {
        const user = knex("user").select("*").first();
        return user;
    }
    async findByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    async getAllUsers(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }

}

export = UserController;