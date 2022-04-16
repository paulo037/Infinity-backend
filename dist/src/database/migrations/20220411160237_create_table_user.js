"use strict";
exports.up = function (knex) {
    return knex.schema.createTable('user', table => {
        table.increments('user_id').primary();
        table.string('name', 120).notNull();
        table.string('image', 120);
        table.string('password', 200).notNull();
        table.string('email', 120).notNull().unique();
        table.boolean('admin').notNull().defaultTo(false);
        table.string('cpf', 11).notNull().unique();
    });
};
exports.down = function (knex) {
    return knex.schema.dropTable('user');
};
