/** Items Data Access Layer
 * This file abstracts over the database operations on [Item] records. */

import { Knex } from "knex";
import { Item } from "./model";

import db from "../config/db";

const table = "ppc.items";

/** getItem(id) retrieves Item [id] from the items table.
 * @returns a Promise containing the item or an error. */
export const getItem = (id: number): Promise<Item> =>
  db(table).where("id", id).first();

/** getItems() retrieves at all [Item]s from the database.
 * @returns a Promise containing an array of Items or an error. */
export const getItems = (): Promise<Array<Item>> => db(table);

/** updateItem(id, name) updates the name of item [id] to be [name].
 * @returns a Promise containing [item] updated or an error.  */
export const updateItem = (id: number, name: string): Promise<Item> =>
  db(table).where("id", id).update({
    name,
  });

/** deleteItem(id) removes item [id] from the database.
 * @returns an Promise containing the [id] of the deleted item or
 * an error. */
export const deleteItem = (id: number): Promise<number> =>
  db(table).where("id", id).del(["id"]);

/** deleteAllItems() removes all items from the database.
 * @returns a Promise containing the number of items deleted or an error. */
export const deleteAllItems = (): Promise<number> => db(table).del();

/** setItems(items) overwrites the current items in the table to be [items].
 * @returns a Promise containing the number of items inserted or an error. */
export const setItems = (items: Array<Item>): Promise<number> =>
  db.transaction(async (trx: Knex.Transaction) => {
    try {
      // Delete all existing items and replace with [items]
      await db(table).truncate().transacting(trx);
      await db(table).insert(items).transacting(trx);

      await trx.commit();
    } catch (e) {
      await trx.rollback();
    }
  });
