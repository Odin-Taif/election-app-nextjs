import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

// const pool = new Pool({
//   user: "",
//   password: "",
//   host: "odinobusi.online",
//   port: 5432,
//   database: "",
// });

// const pool = new Pool({
//   user: "salty-spicy-js_owner",
//   password: "9H2XwsByCMbi",
//   host: "ep-tight-surf-a2zdq1ne-pooler.eu-central-1.aws.neon.tech/salty-spicy-js?sslmode=require",
//   port: 5432,
//   database: "salty-spicy-js",
// });

// async function runQuery() {
//   const client = await pool.connect();
//   try {
//     const result = await client.query("SELECT * FROM elections");
//     console.log(result.rows);
//   } finally {
//     client.release();
//   }
// }
// runQuery().catch((err) => console.error(err));
export const db = drizzle(pool);
