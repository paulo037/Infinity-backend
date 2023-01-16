import knex from "../connection";
import { UserRepository } from "../../../application/repositories/UserRepository";
import { User } from "../../../domain/entities/user/user";
import { Validation } from "../../../domain/validation/validation";
import { v4 as uuidv4 } from "uuid"
import { Address } from "../../../domain/entities/user/address";

export class UserRepositoryMysql implements UserRepository {


    async findByCPF(cpf: string): Promise<User | undefined> {

        try {

            const user = await knex<User>('user')
                .where('cpf', cpf)
                .first();

            return user;

        } catch (e) {
            throw new Error("Não foi possível realizar a busca!")
        }


    }

    async changeAdminPermission(id: string, adminPermission: boolean): Promise<null> {
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
            await knex('user').insert(user);
        } catch (e) {
            throw new Error("Não foi possível criar o usuário!")
        }

        return null;

    }

    async update(user: User): Promise<null> {

        try {
            await knex('user')
                .update(user)
                .where('id', user.id);
        } catch (e) {
            throw new Error("Não foi possível atualizar os dados do usuário!")
        }

        return null;

    }

    delete(id: string): Promise<null> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<User | undefined> {
        try {

            let user = await knex<User>('user')
                .where('id', id)
                .first();

            return user;
        } catch (e) {
            throw new Error("Não foi possível realizar a busca!")
        }

    }

    async findByEmail(email: string): Promise<User | undefined> {
        try {

            let user = await knex<User>('user')
                .where('email', email)
                .first();

            return user;
        } catch (e) {
            throw new Error("Não foi possível realizar a busca!")
        }


    }

    async getAllUsers(page: number, limit: number,): Promise<User[]> {
        try {

            const users = await knex('user')
                .select('first_name', 'admin', 'email', 'id').limit(limit).offset(page * limit - limit)
            return users;
        } catch (e) {
            throw new Error("Não foi possível realizar a busca!")

        }


    }

    async getLenght(): Promise<number> {
        try {
            const order = await knex('user')
                .count('* as count').first() as any;
            return order.count as number;

        } catch (e) {
            throw new Error("Não foi possível realizar a contagem!")
        }
    }

    async getAddresses(user_id: string): Promise<Address[]> {
        try {

            let address = await knex('address')
                .where("address.user_id", user_id);

            return address;
        } catch (e) {
            throw new Error("Não foi possível encontrar nenhum endereço!")
        }

    }

    async getAddress(id: string, user_id: string): Promise<Address> {
        try {

            let address = await knex<Address>('address')
                .where("address.user_id", user_id)
                .andWhere("address.id", id)
                .first();

            if (!address) {
                throw new Error("Endereço não encontrado!")
            }
            return address;
        } catch (e) {
            throw new Error("Endereço não encontrado!")
        }

    }

    async createAddress(address: Address): Promise<null> {
        try {

            await knex('address')
                .insert(address)

            return null;
        } catch (e) {
            throw new Error("Não foi possível Criar o Endereço!")
        }

    }

    async updateAddress(address: Address): Promise<null> {
        try {

            await knex('address')
                .update(address)
                .where("address.user_id", address.user_id)
                .andWhere("address.id", (address.id))

            return null;
        } catch (e) {
            throw new Error("Não foi possível atualizar o Endereço!")
        }

    }

    async passwordRecovery(user_id: string): Promise<string> {
        try {
            const id = uuidv4()
            await knex('password_recovery')
                .insert({ id, user_id });

            return id;
        } catch (e) {
            throw new Error("Não foi possível atualizar o Endereço!")
        }
    }

    async findPasswordRecovery(user_id: string): Promise<Boolean> {
        try {
            const request = await knex('password_recovery')
                .where('user_id', user_id)
                .orderBy('created_at', 'desc')
                .first();

            if (!request) return false;

            const request_date = new Date(request.created_at);
            return (request_date.getTime() + (60 * 15 * 1000) > Date.now());
        } catch (e) {
            throw new Error("Não foi possível realizar a consulta!")
        }
    }

    async passwordRecoveryExist(id: string): Promise<Boolean> {
        try {
            const request = await knex('password_recovery')
                .where('id', id)
                .first();

            if (!request) return false;

            const request_date = new Date(request.created_at);

            return (request_date.getTime() + (1000 * 60 * 15) > Date.now());
        } catch (e) {
            throw new Error("Não foi possível realizar a consulta!")
        }
    }

    async updatePassword(recovery_id: string, password: string): Promise<null> {
        try {
            await knex('user')
                .join('password_recovery', 'password_recovery.user_id', 'user.id')
                .update({ password })
                .where("password_recovery.id", recovery_id);
        } catch (e) {
            throw new Error("Não foi possível atualizar a senha!")
        }

        return null;
    }

    async deleteRecovery(recovery_id: string): Promise<null> {
        try {
            await knex('password_recovery')
                .delete()
                .where("id", recovery_id);
        } catch (e) {
            throw new Error("Não foi possível apagar o link de recuperação!")
        }

        return null;
    }

    async exist(id: string): Promise<Boolean> {
        try {
            const response = await knex.first(
                knex.raw(
                    'exists ? as present',
                    knex('user').select('id').where('id', '=', id).limit(1)
                )
            );
            return response.present === 1;

        } catch (error) {
            throw new Error("Não foi possível realizar a busca!")
        }
    }

}
