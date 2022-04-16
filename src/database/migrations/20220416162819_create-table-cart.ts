import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('cart', table => {
        table.integer('user_id')
            .primary()
            .notNullable()
            .unsigned()
            .references('user_id')
            .inTable('user');

        table.integer('product_id')
            .primary()
            .notNullable()
            .unsigned()
            .references('product_id')
            .inTable('product');

        table.integer('size_id')
            .primary()
            .notNullable()
            .unsigned()
            .references('size_id')
            .inTable('size');
            
        table.integer('quantity').unsigned();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('cart');
}

