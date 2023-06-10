import { Knex } from "knex"; Knex


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('promotion', table => {
        table.string('id', 36).primary().notNullable()
        table.string('name', 120).notNullable();
        table.string('buying_category_id', 36)
            .notNullable()
            .references('id')
            .inTable('category');

        table.integer('buying_quantity')
            .unsigned()
            .notNullable();

        table.string('win_category_id', 36)
            .notNullable()
            .references('id')
            .inTable('category');

        table.integer('win_quantity')
            .unsigned()
            .notNullable();

        table.timestamp('startDate', { precision: 6, useTz: true }).defaultTo(knex.fn.now(6));
        table.timestamp('endDate', { precision: 6, useTz: true }).defaultTo(knex.fn.now(6));

        table.boolean('deleted').defaultTo(false);

    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('promotion')
}

