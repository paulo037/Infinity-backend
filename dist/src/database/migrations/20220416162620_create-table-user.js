"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('user', table => {
        table.increments('user_id').primary();
        table.string('name', 120).notNullable();
        table.string('image', 120);
        table.string('password', 200).notNullable();
        table.string('email', 120).notNullable().unique();
        table.boolean('admin').notNullable().defaultTo(false);
        table.string('cpf', 11).notNullable().unique();
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('user');
}
exports.down = down;
