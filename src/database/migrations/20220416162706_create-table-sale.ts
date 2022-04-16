import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('sale', table => {
        table.increments('sale_id').primary();
        table.decimal('price').notNullable();
        table.timestamp('date', { precision: 6 }).defaultTo(knex.fn.now(6));
        table.integer('address_id').unsigned();
        table.integer('status').unsigned()
            .references('address.address_id');
        table.integer('user_id')
            .notNullable()
            .unsigned()
            .references('user_id')
            .inTable('user');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('sale')
}

