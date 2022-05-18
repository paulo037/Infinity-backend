import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('order', table => {
        table.increments('id').primary();
        table.decimal('price').notNullable();
        table.timestamp('date', { precision: 6 }).defaultTo(knex.fn.now(6));
        table.integer('status').unsigned()
        table.string('name_address',120).notNullable();
        table.string('cep',8).notNullable();
        table.string('estate',100).notNullable();
        table.string('city',100).notNullable();
        table.string('district',100).notNullable();
        table.string('street',100).notNullable();
        table.string('telephone',20).notNullable();
        table.integer('number_address').unsigned();
        table.integer('user_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('user');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('order')
}

