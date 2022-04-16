"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('sale_has_product', table => {
        table.increments('sale_has_product_id').primary();
        table.integer('sale_id')
            .notNullable()
            .unsigned()
            .references('sale_id')
            .inTable('sale');
        table.integer('product_id')
            .notNullable()
            .unsigned()
            .references('product_id')
            .inTable('product');
        table.integer('rating').unsigned();
        table.integer('quantity')
            .unsigned()
            .defaultTo(1)
            .notNullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('sale_has_product');
}
exports.down = down;
