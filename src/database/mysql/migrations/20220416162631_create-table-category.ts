import {Knex} from "knex";Knex


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('category', table => {
        table.string('id', 36).primary()
        table.string('image', 300)
        table.string('name', 100).notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('category');
}

