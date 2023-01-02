import {Knex} from "knex";Knex


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('product_has_category', table => {

        table.string('category_id', 36)
            .notNullable()
            .references('id')
            .inTable('category')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.string('product_id', 36)
            .notNullable()
            .references('id')
            .inTable('product')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('product_has_category');
}

