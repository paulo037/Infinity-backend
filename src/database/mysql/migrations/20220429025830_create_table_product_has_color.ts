import {Knex} from "knex";Knex


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('product_has_color', table => {


        table.string('product_id', 36)
            .notNullable()
            .references('id')
            .inTable('product')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

        table.string('color_id', 36)
            .notNullable()
            .references('id')
            .inTable('color');

        table.string('size_id', 36)
            .notNullable()
            .references('id')
            .inTable('size');

        table.integer('quantity')
            .notNullable()
            .unsigned();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('product_has_color');
}

