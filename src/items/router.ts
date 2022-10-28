/** Items Router
 * This sub-router handles RESTful operations against [Items]. Routes are
 * registered under the /items prefix. */

import { Router, Request, Response } from "express";

// Alias route handler definition in order to save a few keystrokes.
type RouteHandler = (req: Request, res: Response) => void;

const ItemRouter = Router();

// Could expose route handlers for more fine-grained unit testing

const handleGet: RouteHandler = (req, res) => {};

const handleGetAll: RouteHandler = (req, res) => {
  return res.end();
};

const handleUpdate: RouteHandler = (req, res) => {};

const handleSetAll: RouteHandler = (req, res) => {};

const handleDelete: RouteHandler = (req, res) => {};
const handleDeleteAll: RouteHandler = (req, res) => {};

ItemRouter.get("/", handleGetAll);
ItemRouter.get("/:id", handleGet);

ItemRouter.put("/:id", handleUpdate);

ItemRouter.post("/", handleSetAll);

ItemRouter.delete("/", handleDeleteAll);
ItemRouter.delete("/:id", handleDelete);

export default ItemRouter;
