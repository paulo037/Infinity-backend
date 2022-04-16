"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const knex_1 = __importDefault(require("knex"));
exports.config = (0, knex_1.default)({
    client: 'mysql2',
    connection: {
        user: 'root',
        password: 'Phcs$$071825',
        database: 'infinity'
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
});
