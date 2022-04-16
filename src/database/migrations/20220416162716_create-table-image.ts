import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('image', table => {
        table.increments('image_id').primary();
        table.string('url', 120).notNullable();
        table.string('name', 120).notNullable();
        table.string('key', 120).notNullable();
        table.boolean('primary').notNullable();
        table.integer('product_id')
            .notNullable()
            .unsigned()
            .references('product_id')
            .inTable('product')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('image');
}

