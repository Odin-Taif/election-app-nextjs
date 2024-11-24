import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

pool
  .connect()
  .then(() => console.log("Successfully connected to the live database"))
  .catch((err) => console.error("Error connecting to the database", err));
export const db = drizzle(pool, { schema });
