import {Knex} from "knex";Knex


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('order_has_product', table => {
        table.string('id', 36).primary();

        table.string('order_id', 36)
            .notNullable()
            .references('id')
            .inTable('order');

        table.string('product_id', 36)
            .notNullable()
            .references('id')
            .inTable('product');

        table.string('product_name', 50)
            .notNullable()

        table.decimal('product_price').notNullable();

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

