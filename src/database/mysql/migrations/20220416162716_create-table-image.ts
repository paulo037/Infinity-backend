import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('image', table => {
        table.string('id', 36).primary()
        table.string('url', 300).notNullable();
        table.string('name', 120).notNullable();
        table.string('key', 300).notNullable();
        table.boolean('primary').notNullable();
        table.string('product_id', 36)
            .notNullable()
            .references('id')
            .inTable('product')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('image');
}

