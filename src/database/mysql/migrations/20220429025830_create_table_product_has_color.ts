import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('product_has_color', table => {


        table.integer('product_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('product')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.integer('color_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('color')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.integer('size_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('size')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.integer('quantity')
            .notNullable()
            .unsigned();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('product_has_color');
}

