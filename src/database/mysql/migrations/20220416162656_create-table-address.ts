import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('address', table => {
        table.increments('id').primary();
        table.string('name',120).notNullable();
        table.string('cep',8).notNullable();
        table.string('estate',100).notNullable();
        table.string('city',100).notNullable();
        table.string('district',100).notNullable();
        table.string('street',100).notNullable();
        table.integer('telephone',20).notNullable();
        table.integer('number').unsigned();
        table.integer('user_id')
                    .notNullable()
                    .unsigned()
                    .references('id')
                    .inTable('user')
                    .onDelete('CASCADE')
                    .onUpdate('CASCADE');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('address');
}

