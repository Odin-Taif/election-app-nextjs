import { Pool } from "pg";
import * as electionSchema from "../features/election-managment/schema";
import * as publicSchema from "../features/public-managment/schema";
import * as representativeSchema from "../features/representative-managment/schema";
import { drizzle } from "drizzle-orm/node-postgres";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl:
    process.env.DATABASE_SSL === "true"
      ? { rejectUnauthorized: false }
      : undefined,
});

export const db = drizzle(pool, {
  schema: {
    election: electionSchema,
    public: publicSchema,
    representative: representativeSchema,
  },
});
