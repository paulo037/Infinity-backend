"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('cart', table => {
        table.integer('user_id')
            .primary()
            .notNullable()
            .unsigned()
            .references('user_id')
            .inTable('user');
        table.integer('product_id')
            .primary()
            .notNullable()
            .unsigned()
            .references('product_id')
            .inTable('product');
        table.integer('size_id')
            .primary()
            .notNullable()
            .unsigned()
            .references('size_id')
            .inTable('size');
        table.integer('quantity').unsigned();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('cart');
}
exports.down = down;
