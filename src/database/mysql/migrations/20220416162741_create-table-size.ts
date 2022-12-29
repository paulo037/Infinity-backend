import {Knex} from "knex";Knex


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('size', table => {
        table.string('id', 36).primary()
        table.string('value', 50)
            .notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('size');
}

