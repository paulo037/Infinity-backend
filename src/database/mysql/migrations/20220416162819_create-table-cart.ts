import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('cart', table => {
        table.integer('user_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('user');

        table.integer('product_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('product');

        table.integer('size_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('size');

        table.integer('color_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('color');

        table.primary(['user_id','product_id', 'size_id', 'color_id'])
        table.integer('quantity').unsigned()
            .notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('cart');
}

