import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
export const publicVoters = pgTable("public_voters", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).unique(),
  created_at: timestamp("created_at").defaultNow(),
});

export const publicPreferences = pgTable("public_preferences", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  public_voter_id: integer("public_voter_id")
    .notNull()
    .references(() => publicVoters.id),
  election_id: integer("election_id").notNull(),
  preferred_proposal_id: integer("preferred_proposal_id"),
  representative_id: integer("representative_id"),
});
