import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const elections = pgTable("elections", {
  id: serial("id").primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  status: varchar("status", { length: 50 }),
  created_at: timestamp("created_at").defaultNow(),
  concluded_at: timestamp("concluded_at"),
  proposals: varchar({ length: 255 }).array(),
});
export const representative = pgTable("representative", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  election: varchar({ length: 255 }).notNull(),
});
export const publicVoters = pgTable("public_voters", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
