"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('category', table => {
        table.increments('category_id').primary();
        table.string('image', 100);
        table.string('name', 100).notNullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('category');
}
exports.down = down;
