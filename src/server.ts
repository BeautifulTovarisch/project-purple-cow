"use strict";

const express = require("express");

const app = express();
const path = require("path");
const bodyParser = require("body-parser");

const APP_PORT = process.env.PORT || 2305;
const APP_HOST = process.env.HOST || "127.0.0.1";

/////////////// Middlewares ///////////////

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

/////////////// Routes ///////////////

const itemsRouter = require(path.resolve("items/router"));

app.use("/", itemsRouter);

if (app.get("env") === "development") {
  app.use((err, req, res, next) => {
    console.log(err);

    return err ? res.status(err.status || 500).end() : next();
  });
}

app.listen(APP_PORT, APP_HOST, () => {
  console.log(`App Started at ${APP_HOST}:${APP_PORT}`);
});
