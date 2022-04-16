import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('product', table => {
        table.increments('product_id').primary();
        table.string('name', 120).notNullable();
        table.decimal('price').notNullable();
        table.text('description');
        table.integer('height').notNullable();
        table.integer('width').notNullable();
        table.integer('length').notNullable();

    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('product');
}

