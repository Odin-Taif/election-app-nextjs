import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const elections = pgTable("elections", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  proposal: varchar({ length: 255 }).notNull(),
});
export const repesentative = pgTable("repesentative", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  election: varchar({ length: 255 }).notNull(),
});
