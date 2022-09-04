import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('color', table => {
        table.string('id', 36).primary()
        
        table.string('value', 50)
            .notNullable()

    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('color');
}

