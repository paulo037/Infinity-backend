import knex from "knex";
const  config =  require("../../../knexfile")


const connection = knex(config);

export default connection;