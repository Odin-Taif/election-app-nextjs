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
  // .references(() => elections.id),
  preferred_proposal_id: integer("preferred_proposal_id").notNull(),
  // .references(() => electionProposals.id),
});

export const representative = pgTable("representative", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  election_id: integer("election_id"),
  //   .references(() => elections.id),
});

export const votes = pgTable("votes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  public_voter_id: integer("public_voter_id").notNull(),
  election_proposal_id: integer("election_proposal_id").notNull(),
  // .references(() => electionProposals.id),
  representative_id: integer("representative_id").notNull(),
});
