import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('sale_has_product', table => {
        table.increments('sale_has_product_id').primary();
        table.integer('sale_id')
            .notNullable()
            .unsigned()
            .references('sale_id')
            .inTable('sale');

        table.integer('product_id')
            .notNullable()
            .unsigned()
            .references('product_id')
            .inTable('product');

        table.integer('rating').unsigned();
        table.integer('quantity')
                .unsigned()
                .defaultTo(1)
                .notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('sale_has_product');
}

