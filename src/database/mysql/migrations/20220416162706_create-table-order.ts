import {Knex} from "knex";Knex


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('order', table => {
        table.string('id', 36).primary().notNullable()
        table.decimal('price',14,2).notNullable();
        table.decimal('shipping_price',14,2).defaultTo(0);
        table.timestamp('created_at', { precision: 6,  useTz: true }).defaultTo(knex.fn.now(6));
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
    return knex.schema.dropTableIfExists('order')
}

