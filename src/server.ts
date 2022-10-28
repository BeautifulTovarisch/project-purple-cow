/** Project Purple Cow
 * Simple express-based RESTful API satisfying basic CRUD operations
 * on Items. Item records are persisted in a PostgreSQL database. */

import morgan from "morgan";
import express from "express";
import bodyParser from "body-parser";

// Initialize database before application startup to prevent wasting time
// in the event the client is unable to connect.
import db from "./config/db.js";

import ItemsRouter from "./items/router";

const app = express();

const APP_PORT = Number(process.env.APP_PORT) || 3000;
const APP_HOST = process.env.APP_HOST || "127.0.0.1";

const checkDb = async () => {
  try {
    await db.raw("SELECT 1 AS canary");
  } catch (e) {
    throw new Error(
      "Unable to initialize database client. Please ensure postgresql is accepting connections before running server"
    );
  }
};

checkDb();

// Middlewares

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

app.use("/items", ItemsRouter);

const errorHandler: express.ErrorRequestHandler = (err, _, res, _next) => {
  console.error(err);

  return res.status(500).send({ err: err.message });
};

app.use(errorHandler);

app.listen(APP_PORT, APP_HOST, () => {
  console.log(`App Started at ${APP_HOST}:${APP_PORT}`);
});
