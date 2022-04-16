"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('address', table => {
        table.increments('address_id').primary();
        table.string('name', 120).notNullable();
        table.string('cep', 8).notNullable();
        table.string('estate', 100).notNullable();
        table.string('city', 100).notNullable();
        table.string('district', 100).notNullable();
        table.string('street', 100).notNullable();
        table.integer('telephone', 20).notNullable();
        table.integer('number').unsigned();
        table.integer('user_id')
            .notNullable()
            .unsigned()
            .references('user_id')
            .inTable('user')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    });
}
exports.up = up;
async function down(knex) {
    return knex.schema.dropTable('address');
}
exports.down = down;
