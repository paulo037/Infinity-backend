import {Knex} from "knex";Knex


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('order', table => {
        table.string('id', 36).primary().notNullable()
        table.decimal('price').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.integer('status').defaultTo(0)
        table.string('user_name',120).notNullable();
        table.string('cep',8).notNullable();
        table.string('state',20).notNullable();
        table.string('city',100).notNullable();
        table.string('district',100).notNullable();
        table.string('street',100).notNullable();
        table.string('telephone',20).notNullable();
        table.string('tracking_code',13)
        table.integer('number').unsigned();
        table.string('complement',150)
        table.string('user_id', 36)
            .notNullable()
            .references('id')
            .inTable('user');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('order')
}

