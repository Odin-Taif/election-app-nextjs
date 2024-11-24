import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const elections = pgTable("elections", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().defaultNow(),
  proposals: varchar({ length: 255 }).array(),
});
export const representative = pgTable("representative", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  election: varchar({ length: 255 }).notNull(),
});
