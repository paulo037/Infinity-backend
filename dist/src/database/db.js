"use strict";
const config = require("knexfile");
const knex = require('knex')(config);
knex.migrate.latest([config]);
