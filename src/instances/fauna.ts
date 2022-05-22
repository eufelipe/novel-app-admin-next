import { Client } from "faunadb";
import { query as q } from "faunadb";

const fauna = new Client({
  secret: process.env.FAUNADB_KEY,
});

export { q, fauna };
