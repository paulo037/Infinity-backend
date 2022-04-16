import type { Knex } from "knex";
import path from "path";


const config: { [key: string]: Knex.Config } = {

    production: {
        client: process.env.BD_CLIENT,
        connection: {
            user: process.env.BD_USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: process.env.MIGRATIONS
        },

        seeds: {
            directory: process.env.SEEDS
        },
    }


};

export default config;
