import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('size', table => {      
        table.increments('id')
            .notNullable()
            .primary();
        table.string('value',20)
            .notNullable();
            
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('size');
}

