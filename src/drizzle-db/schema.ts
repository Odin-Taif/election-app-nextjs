import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const electionsTable = pgTable("elections", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});
