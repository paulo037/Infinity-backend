"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('size', table => {
        table.increments('size_id')
            .notNullable()
            .primary();
        table.string('value', 20)
            .notNullable();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('size');
}
exports.down = down;
