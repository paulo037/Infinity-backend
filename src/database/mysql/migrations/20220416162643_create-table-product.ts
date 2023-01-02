import {Knex} from "knex";Knex


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('product', table => {
        table.string('id', 36).primary()
        table.string('name', 120).notNullable();
        table.decimal('price', 14,2).notNullable();
        table.text('description');
        table.integer('height');
        table.integer('width');
        table.integer('length');
        table.decimal('weight');
        
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('product');
}

