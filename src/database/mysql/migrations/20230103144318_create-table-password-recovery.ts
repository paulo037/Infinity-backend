import { Knex } from "knex";



export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('password_recovery', table => {
        table.string('id', 36).primary().notNullable()
        table.timestamp('created_at', { precision: 6,  useTz: true }).defaultTo(knex.fn.now(6));
        table.string('user_id', 36)
            .notNullable()
            .references('id')
            .inTable('user');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('password_recovery');
}

