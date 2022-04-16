import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('product_has_category', table => {

        table.integer('category_id')
            .notNullable()
            .unsigned()
            .references('category_id')
            .inTable('category')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

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
    return knex.schema.dropTable('product_has_category');
}

