/** Functional tests for the items API
 * Please ensure cluster is running before running tests. */

const Knex = require("knex");

const axios = require("axios");

const url = "http://localhost:3000/items";

let db;

beforeAll(async () => {
  db = Knex({
    client: "pg",
    connection: {
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "dev_password",
      database: "proj_purple_cow",
    },
  });

  try {
    await db.raw("SELECT 1 AS canary");
  } catch (e) {
    console.error(e);

    process.exit(1);
  }
});

// Remove canary test items
afterEach(async () => {
  await db("ppc.items").del().whereILike("name", "Test%");
});

afterAll(async () => {
  db.destroy();
});

describe("Items", () => {
  test("Get all items", async () => {
    const inserted = await db("ppc.items").insert(
      [{ name: "TestA" }, { name: "TestB" }],
      ["id", "name"]
    );

    const res = await axios.get(url);

    // Match on subset to accommodate existing records.
    expect(res.data).toEqual(expect.arrayContaining(inserted));
  });

  test("Get individual item", async () => {
    const inserted = await db("ppc.items").insert({ name: "TestA" }, [
      "id",
      "name",
    ]);

    const res = await axios.get(`${url}/${inserted[0].id}`);

    expect(res.data).toEqual(inserted[0]);
  });

  // Remaining tests left unimplemented for brevity.
  test.todo("Update item");

  test.todo("Delete item");
  test.todo("Delete all items");

  test.todo("Set current items");
});
