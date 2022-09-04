import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('cart', table => {
        table.string('user_id', 36)
            .notNullable()
            .references('id')
            .inTable('user')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');


        table.string('product_id', 36)
            .notNullable()
            .references('id')
            .inTable('product')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.string('size_id', 36)
            .notNullable()
            .references('id')
            .inTable('size');


        table.string('color_id', 36)
            .notNullable()
            .references('id')
            .inTable('color');

        table.primary(['user_id', 'product_id', 'size_id', 'color_id'])
        table.integer('quantity').unsigned()
            .notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('cart');
}

