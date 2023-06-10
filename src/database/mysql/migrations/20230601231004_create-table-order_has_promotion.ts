import {Knex} from "knex";Knex


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('order_has_promotion', table => {
        table.string('id', 36).primary();

        table.string('order_id', 36)
            .notNullable()
            .references('id')
            .inTable('order');

        table.string('promotion_id', 36)
            .notNullable()
            .references('id')
            .inTable('promotion');

        table.decimal('price').unsigned();

        table.integer('quantity')
            .unsigned()
            .defaultTo(1)
            .notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('order_has_promotion');
}

