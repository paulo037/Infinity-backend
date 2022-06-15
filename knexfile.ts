const dotenv = require('dotenv')
dotenv.config()


module.exports = {
    client: process.env.BD_CLIENT,
    connection: {
        host: process.env.HOST,
        port: process.env.PORT,
        user: process.env.BD_USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    },
    pool: { min: 0, max: 7 },

    migrations: {
        directory: process.env.MIGRATIONS
    },

    seeds: {
        directory: process.env.SEEDS
    },

};

