/** DB Configuration.
 * This module configures a postgresql client used to build and execute
 * queries. */

const Knex = require("knex");

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbHost = process.env.DB_HOST;

export default Knex({
  client: "pg",
  connection: {
    host: dbHost,
    port: 5432,
    user: dbUser,
    password: dbPass,
    database: "proj_purple_cow",
  },
});
