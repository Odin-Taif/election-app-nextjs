import { electionProposals, elections, votes } from "@/drizzle-db/schema";
import { ELECTION_PROPOSAL, INITIAT_EELECTION } from "./types";
import { db } from "@/drizzle-db";
import { desc, eq } from "drizzle-orm";

export function createRepository() {
  async function initiateElectionInDb({ name }: INITIAT_EELECTION) {
    return await db.insert(elections).values({ name });
  }
  async function addProposalToElection({
    election_id,
    proposal,
  }: ELECTION_PROPOSAL) {
    try {
      console.log("Inserting proposal:", { election_id, proposal });
      const result = await db
        .insert(electionProposals)
        .values({ election_id, proposal });
      return result;
    } catch (error) {
      console.error("Error adding proposal to election:", error);
    }
  }
  async function getElectionsFromDb() {
    try {
      return await db
        .select()
        .from(elections)
        .orderBy(desc(elections.created_at));
    } catch (error) {
      console.error("Error fetching elections:", error);
      return [];
    }
  }
  async function getProposalsForElectionFromDb(election_id: number) {
    try {
      const proposals = await db
        .select()
        .from(electionProposals)
        .where(eq(electionProposals.election_id, election_id))
        .orderBy(desc(electionProposals.id));

      return proposals;
    } catch (error) {
      console.error("Error fetching proposals for election:", error);
      return [];
    }
  }
  async function getVoteCountsOnProposalFromDb() {
    try {
      const result = await db
        .select({
          election_proposal_id: votes.election_proposal_id,
          count: db.$count(votes),
        })
        .from(votes)
        .groupBy(votes.election_proposal_id);
      return result;
    } catch (error) {
      console.error("Error fetching vote counts:", error);
      throw error;
    }
  }
  return {
    initiateElectionInDb,
    getElectionsFromDb,
    addProposalToElection,
    getProposalsForElectionFromDb,
    getVoteCountsOnProposalFromDb,
  };
}

export type Repository = ReturnType<typeof createRepository>;
