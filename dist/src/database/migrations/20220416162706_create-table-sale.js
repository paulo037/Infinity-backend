"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('sale', table => {
        table.increments('sale_id').primary();
        table.decimal('price').notNullable();
        table.timestamp('date', { precision: 6 }).defaultTo(knex.fn.now(6));
        table.integer('address_id').unsigned();
        table.integer('status').unsigned()
            .references('address.address_id');
        table.integer('user_id')
            .notNullable()
            .unsigned()
            .references('user_id')
            .inTable('user');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('sale');
}
exports.down = down;
