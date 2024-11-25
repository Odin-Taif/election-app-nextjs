import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const elections = pgTable("elections", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  status: varchar("status", { length: 50 }).default("on"),
  created_at: timestamp("created_at").defaultNow(),
  concluded_at: timestamp("concluded_at"),
});

export const electionProposals = pgTable("election_proposals", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  election_id: integer("election_id")
    .notNull()
    .references(() => elections.id),
  proposal: varchar("proposal", { length: 255 }).notNull(),
});

export const representative = pgTable("representative", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  name: varchar({ length: 255 }).notNull(),
  election_id: integer("election_id").references(() => elections.id),
});

export const publicVoters = pgTable("public_voters", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).unique(),
  created_at: timestamp("created_at").defaultNow(),
});

export const votes = pgTable("votes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  public_voter_id: integer("public_voter_id")
    .notNull()
    .references(() => publicVoters.id),
  election_proposal_id: integer("election_proposal_id")
    .notNull()
    .references(() => electionProposals.id),
  representative_id: integer("representative_id")
    .notNull()
    .references(() => representative.id),
});

export const publicPreferences = pgTable("public_preferences", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  public_voter_id: integer("public_voter_id")
    .notNull()
    .references(() => publicVoters.id),
  election_id: integer("election_id")
    .notNull()
    .references(() => elections.id),
  preferred_proposal_id: integer("preferred_proposal_id")
    .notNull()
    .references(() => electionProposals.id),
});

export const representativePublicVotes = pgTable(
  "representative_public_votes",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    representative_id: integer("representative_id")
      .notNull()
      .references(() => representative.id),
    public_voter_id: integer("public_voter_id")
      .notNull()
      .references(() => publicVoters.id),
  }
);
