import { Pool } from "pg";
import * as schema from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL!,
// });

const pool = new Pool({
  user: "levantisk",
  password: "le123123321!",
  host: "odinobusi.online",
  port: 5432,
  database: "levantisk",
});

async function runQuery() {
  const client = await pool.connect();
  try {
    const result = await client.query("SELECT * FROM elections");
    console.log(result.rows);
  } finally {
    client.release();
  }
}
runQuery().catch((err) => console.error(err));

export const db = drizzle(pool, { schema });
