"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('product', table => {
        table.increments('product_id').primary();
        table.string('name', 120).notNullable();
        table.decimal('price').notNullable();
        table.text('description');
        table.integer('height').notNullable();
        table.integer('width').notNullable();
        table.integer('length').notNullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('product');
}
exports.down = down;
