import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    await knex("user").insert([
        { user_id: 1,
        name: "paulo",
        image:"ww.exemple",
        password:"11225221",
        email: "paulo@gmail.com",
        admin:true,
        cpf:"1231231233"},

    ]);
};
