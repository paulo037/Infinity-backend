import knex, { Knex } from "knex";
import path from "path";
import config from "../../knexfile"
require('dotenv').config()


const connection = knex({
    client: process.env.BD_CLIENT,
    connection: {
        user: process.env.BD_USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
    }
});


export default connection;