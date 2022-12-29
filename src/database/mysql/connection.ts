
const dotenv = require('dotenv')
dotenv.config()
import knex from "knex";


const  config =  require("../../../knexfile")

const connection = knex(config);

export default connection;

