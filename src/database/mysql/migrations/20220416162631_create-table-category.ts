import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('category', table => {
        table.increments('id').primary()
        table.string('image', 300)
        table.string('name', 100).notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('category');
}

