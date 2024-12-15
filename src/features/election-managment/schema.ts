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

export const votes = pgTable("votes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  representative_id: integer("representative_id").notNull(),
  election_proposal_id: integer("election_proposal_id")
    .notNull()
    .references(() => electionProposals.id),
});
