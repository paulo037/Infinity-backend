"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('product_has_category', table => {
        table.integer('category_id')
            .notNullable()
            .unsigned()
            .references('category_id')
            .inTable('category')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
        table.integer('product_id')
            .notNullable()
            .unsigned()
            .references('product_id')
            .inTable('product')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('product_has_category');
}
exports.down = down;
