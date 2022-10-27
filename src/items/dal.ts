/** Items Data Access Layer
 * This file abstracts over the database operations on [Item]s records. */

import { Item } from "./model";

import { client } from "../config/database";

/** getItem(id) retrieves Item [id] from the items table.
 * @returns a Promise containing the item or an error. */
export const getItem = async (id: number): Promise<Item> => {};

/** getItems(max, filter) retrieves at most [max] [Item]s from the database.
 * @returns a Promise containing an array of Items or an error. */
export const getItems = async (max: number): Promise<Array<Item>> => {};

/** updateItem(id, name) updates the name of item [id] to be [name].
 * @returns a Promise containing [item] updated or an error.  */
export const updateItem = async (id: number, name: string): Promise<Item> => {};

/** deleteAllItems() removes all items from the database.
 * @returns a Promise containing the number of items deleted or an error. */
export const deleteAllItems = async (): Promise<number> => {};

/** deleteItem(id) removes item [id] from the database.
 * @returns an Promise containing the [id] of the deleted item or
 * an error. */
export const deleteItem = async (id: number): Promise<number> => {};
