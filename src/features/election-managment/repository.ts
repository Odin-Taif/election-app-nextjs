import { electionProposals, elections, votes } from "./schemas";
import { ELECTION_PROPOSAL } from "./types";
import { db } from "@/drizzle-db";
import { desc, eq } from "drizzle-orm";

export function createRepository() {
  async function initiateElectionInDb({ name }: { name: string }) {
    try {
      await db.insert(elections).values({ name });
    } catch (error) {
      console.error("Error adding an election:", error);
      throw new Error("Failed to add election.");
    }
  }
  async function addProposalToElection({
    election_id,
    proposal,
  }: ELECTION_PROPOSAL) {
    try {
      await db.insert(electionProposals).values({ election_id, proposal });
    } catch (error) {
      console.error("Error adding proposal to election:", error);
      throw new Error("Failed to add proposal.");
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
      throw new Error("Error fetching elections.");
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
      throw new Error("Error fetching proposals for election");
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
    addProposalToElection,
    getElectionsFromDb,
    getProposalsForElectionFromDb,
    getVoteCountsOnProposalFromDb,
  };
}

export type Repository = ReturnType<typeof createRepository>;
