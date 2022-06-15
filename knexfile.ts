const dotenv = require('dotenv')
dotenv.config()


module.exports = {
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

