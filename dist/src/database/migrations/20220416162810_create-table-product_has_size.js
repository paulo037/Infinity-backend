"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('product_has_size', table => {
        table.integer('size_id')
            .notNullable()
            .unsigned()
            .references('size_id')
            .inTable('size')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.integer('product_id')
            .notNullable()
            .unsigned()
            .references('product_id')
            .inTable('product')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.integer('quantity')
            .notNullable()
            .unsigned();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('product_has_size');
}
exports.down = down;
