import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('color', table => {
        table.increments('id').unsigned().primary()
        
        table.string('value', 50)
            .notNullable()

    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('color');
}

