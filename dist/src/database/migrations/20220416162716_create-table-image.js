"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
async function up(knex) {
    return knex.schema.createTable('image', table => {
        table.increments('image_id').primary();
        table.string('url', 120).notNullable();
        table.string('name', 120).notNullable();
        table.string('key', 120).notNullable();
        table.boolean('primary').notNullable();
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
    return knex.schema.dropTable('image');
}
exports.down = down;
