import {Knex} from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('address', (table : any)=> {
        table.string('id', 36).primary();
        table.string('user_name',120).notNullable();
        table.string('cep',8).notNullable();
        table.string('state',20).notNullable();
        table.string('city',100).notNullable();
        table.string('district',100).notNullable();
        table.string('street',100).notNullable();
        table.string('complement',150)
        table.string('telephone',20).notNullable();
        table.integer('number').unsigned();
        table.string('user_id', 36)
                    .notNullable()
                    .references('id')
                    .inTable('user')
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('address');
}

