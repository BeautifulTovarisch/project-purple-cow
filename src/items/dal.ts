/** Items Data Access Layer
 * This file abstracts over the database operations on [Item] records. */

import { Item } from "./model";

const db = require("../config/db");

/** getItem(id) retrieves Item [id] from the items table.
 * @returns a Promise containing the item or an error. */
export const getItem = (id: number): Promise<Item> =>
  db("items").where("id", id).first();

/** getItems() retrieves at all [Item]s from the database.
 * @returns a Promise containing an array of Items or an error. */
export const getItems = (): Promise<Array<Item>> => db("items");

/** replaceitems(items) sets the current items in the table to [items].
 * @returns a Promise containing the number of items inserted or an error. */

/** updateItem(id, name) updates the name of item [id] to be [name].
 * @returns a Promise containing [item] updated or an error.  */
export const updateItem = (id: number, name: string): Promise<Item> =>
  db("items").where("id", id).update({
    name,
  });

/** deleteAllItems() removes all items from the database.
 * @returns a Promise containing the number of items deleted or an error. */
export const deleteAllItems = (): Promise<number> => db("items").del();

/** deleteItem(id) removes item [id] from the database.
 * @returns an Promise containing the [id] of the deleted item or
 * an error. */
export const deleteItem = (id: number): Promise<number> =>
  db("items").where("id", id).del();
