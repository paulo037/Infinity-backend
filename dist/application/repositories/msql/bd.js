"use strict";
const knexfile_1 = require("./knexfile");
const knex = require('knex')(knexfile_1.config);
knex.migrate.latest([knexfile_1.config]);
module.exports = knex;
