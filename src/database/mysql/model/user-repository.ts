import knex from "../connection";
import { UserRepository } from "../../../application/repositories/UserRepository";
import { User } from "../../../domain/entities/user/user";
import { Validation } from "../../../domain/validation/validation";


export class UserRepositoryMysql implements UserRepository {

    async findByCPF(cpf: string): Promise<User | null> {

        try {

            let user = await knex('*')
                .from("user as u")
                .where('u.cpf', cpf)
                .first();

            if (user) {
                user = User.create({
                    ...user
                })
            }
            return user;

        } catch (e) {
            throw new Error("Não foi possível realizar a busca!")
        }


    }

    async changeAdminPermission(id: number, adminPermission: Boolean): Promise<null> {
        try {

            await knex('user')
                .update('user.admin', adminPermission)
                .where({ id: id })
            return null;


        } catch (e) {
            throw new Error("Não foi possível mudar a permissão do usuário!")
        }

    }

    async create(user: User): Promise<null> {

        try {
            await knex('user').insert({ ...user.props });
        } catch (e) {
            throw new Error("Não foi possível criar o usuário!")
        }

        return null;

    }

    async update(user: User): Promise<null> {

        try {
            await knex('user as u')
                .update({ ...user.props })
                .where('u.id', user.props.id);
        } catch (e) {
            throw new Error("Não foi possível atualizar os dados do usuário!")
        }

        return null;

    }


    delete(id: number): Promise<null> {
        throw new Error("Method not implemented.");
    }

    async findById(id: number): Promise<User | null> {
        try {

            let user = await knex('*')
                .from("user as u")
                .where('u.id', id)
                .first();

            if (user) {
                user = User.create({
                    ...user
                })
            }
            return user;
        } catch (e) {
            throw new Error("Não foi possível realizar a busca!")
        }

    }
    async findByEmail(email: string): Promise<User | null> {
        try {

            let user = await knex('*')
                .from("user as u")
                .where('u.email', email)
                .first();

            if (user) {
                user = User.create({
                    ...user
                })
            }
            return user;
        } catch (e) {
            throw new Error("Não foi possível realizar a busca!")
        }


    }


    async getAllUsers(): Promise<User[]> {
        try {

            const users = await knex('user')
                .select('first_name', 'admin', 'email', 'id')
            return users;
        } catch (e) {
            throw new Error("Não foi possível realizar a busca!")
        }


    }


}
