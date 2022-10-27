/** Items Router
 * This sub-router handles RESTful operations against [Items]. Routes are
 * registered under the /items prefix. */

const Router = require("express").Router();

Router.get("/", (req, res) => {
  return res.end();
});

export default Router;
