/** Project Purple Cow
 * Simple express-based RESTful API satisfying basic CRUD operations
 * on Items. Item records are persisted in a PostgreSQL database. */

import path from "path";
import express from "express";
import bodyParser from "body-parser";

const app = express();

const APP_PORT = Number(process.env.PORT) ?? 3000;
const APP_HOST = process.env.HOST || "127.0.0.1";

// Initialize database before application startup to prevent wasting time
// in the event the client is unable to initialize.
require("config/dbconfig.js");

/////////////// Middlewares ///////////////

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/////////////// Routes ///////////////

const itemsRouter = require(path.resolve("items/router"));

app.use("/", itemsRouter);

const errorHandler: express.ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);

  return err ? res.status(err.status || 500).end() : next();
};

app.use(errorHandler);

app.listen(APP_PORT, APP_HOST, () => {
  console.log(`App Started at ${APP_HOST}:${APP_PORT}`);
});
