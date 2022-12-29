import knex from "../connection";
import { UserRepository } from "../../../application/repositories/UserRepository";
import { User } from "../../../domain/entities/user/user";
import { Validation } from "../../../domain/validation/validation";
import { v4 as uuidv4 } from "uuid"
import { Address } from "../../../domain/entities/user/address";

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
            await knex('user').insert({ id: uuidv4(), ...user.props });
        } catch (e) {
            throw new Error("Não foi possível criar o usuário!")
        }

        return null;

    }

    async update(user: User): Promise<null> {

        try {
            await knex('user as u')
                .update({ ...user.props })
                .where('u.id', (user.props.id as string));
        } catch (e) {
            throw new Error("Não foi possível atualizar os dados do usuário!")
        }

        return null;

    }


    delete(id: string): Promise<null> {
        throw new Error("Method not implemented.");
    }

    async findById(id: string): Promise<User | null> {
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

            let address = await knex('address')
                .where("address.user_id", user_id)
                .andWhere("address.id", id)
                .first();
            
            if (!address){
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
                .insert(address.props)
                
            return null;
        } catch (e) {
            throw new Error("Não foi possível atualizar o Endereço!")
        }

    }
    

    async updateAddress(address: Address): Promise<null> {
        try {

            await knex('address')
                .update(address.props)
                .where("address.user_id", address.props.user_id)
                .andWhere("address.id", (address.props.id as string))
                
            return null;
        } catch (e) {
            throw new Error("Não foi possível atualizar o Endereço!")
        }

    }


    


}
