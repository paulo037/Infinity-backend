import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('user', table =>{
        table.increments('user_id').primary()
        table.string('name', 120).notNullable()
        table.string('image', 120)
        table.string('password', 200).notNullable()
        table.string('email', 120).notNullable().unique()
        table.boolean('admin').notNullable().defaultTo(false)
        table.string('cpf', 11).notNullable().unique()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('user')
}

