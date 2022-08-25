const dotenv = require('dotenv')
dotenv.config()


const local = {
    client: process.env.BD_CLIENT,
    connection: {
        host: process.env.HOST,
        port: process.env.PORT_BD,
        user: process.env.BD_USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    },

    migrations: {
        directory: process.env.MIGRATIONS
    },

    seeds: {
        directory: process.env.SEEDS
    },

};


const production = {
    client: process.env.BD_CLIENT_PRODUCTION,
    connection: {
        host: process.env.HOST_PRODUCTION,
        port: process.env.PORT_BD_PRODUCTION,
        user: process.env.BD_USER_PRODUCTION,
        password: process.env.PASSWORD_PRODUCTION,
        database: process.env.DATABASE_PRODUCTION
    },

    migrations: {
        directory: process.env.MIGRATIONS
    },

    seeds: {
        directory: process.env.SEEDS
    },

};


module.exports = process.env.ENVIRONMENT_TYPE == 'local' ? local : production