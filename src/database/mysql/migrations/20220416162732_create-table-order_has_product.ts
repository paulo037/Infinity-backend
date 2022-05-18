import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('order_has_product', table => {
        table.increments('id').primary();

        table.integer('order_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('order');

        table.integer('product_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('product');

        table.string('product_name', 50)
            .notNullable()

        table.string('color', 50)
            .notNullable()

        table.string('size', 50)
            .notNullable()

        table.decimal('rating').unsigned();

        table.integer('quantity')
            .unsigned()
            .defaultTo(1)
            .notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('order_has_product');
}

