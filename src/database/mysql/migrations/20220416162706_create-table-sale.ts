import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('sale', table => {
        table.increments('id').primary();
        table.decimal('price').notNullable();
        table.timestamp('date', { precision: 6 }).defaultTo(knex.fn.now(6));
        table.integer('status').unsigned()
        table.integer('address_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('address');

        table.integer('user_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('user');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('sale')
}

