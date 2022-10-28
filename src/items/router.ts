/** Items Router
 * This sub-router handles RESTful operations against [Items]. Routes are
 * registered under the /items prefix. */

import { Router, Request, Response, NextFunction } from "express";

import {
  getItem,
  getItems,
  setItems,
  updateItem,
  deleteItem,
  deleteAllItems,
} from "./dal";

// Alias route handler definition in order to save a few keystrokes.
type RouteHandler = (req: Request, res: Response, next: NextFunction) => void;

const ItemRouter = Router();

// Could expose route handlers for more fine-grained unit testing

const handleGet: RouteHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const item = await getItem(Number(id));

    res.send(item);
  } catch (e) {
    next(e);
  }
};

const handleGetAll: RouteHandler = async (_, res, next) => {
  try {
    const items = await getItems();

    res.send(items);
  } catch (e) {
    next(e);
  }
};

const handleUpdate: RouteHandler = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updated = await updateItem(Number(id), name);

    res.send(updated);
  } catch (e) {
    next(e);
  }
};

const handleSetAll: RouteHandler = async (req, res, next) => {
  const { items } = req.body;

  try {
    const numSet = await setItems(items);

    res.send(numSet);
  } catch (e) {
    next(e);
  }
};

const handleDelete: RouteHandler = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleted = await deleteItem(Number(id));

    res.send(deleted);
  } catch (e) {
    next(e);
  }
};

const handleDeleteAll: RouteHandler = async (_, res, next) => {
  try {
    const numDeleted = await deleteAllItems();

    res.send(numDeleted);
  } catch (e) {
    next(e);
  }
};

// Check for id on all required routes.
ItemRouter.all("/:id", (req, res, next): RouteHandler => {
  const { id } = req.params;

  if (!Number(id)) {
    res.status(400).send("Invalid Identifier");

    return;
  }

  next();
});

ItemRouter.get("/", handleGetAll);
ItemRouter.get("/:id", handleGet);

ItemRouter.put("/:id", handleUpdate);

ItemRouter.post("/", handleSetAll);

ItemRouter.delete("/", handleDeleteAll);
ItemRouter.delete("/:id", handleDelete);

export default ItemRouter;
