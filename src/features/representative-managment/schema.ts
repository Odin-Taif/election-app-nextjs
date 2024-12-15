import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const representative = pgTable("representative", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  election_id: integer("election_id"),
});

export const representativePreferences = pgTable("representative_preferences", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  representative_id: integer("representative_id")
    .notNull()
    .references(() => representative.id),
  election_id: integer("election_id").notNull(),
  preferred_proposal_id: integer("preferred_proposal_id"),
});
