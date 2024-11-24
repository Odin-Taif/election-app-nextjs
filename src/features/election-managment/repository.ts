import { electionProposals, elections } from "@/drizzle-db/schema";
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
      return await db
        .insert(electionProposals)
        .values({ election_id, proposal });
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
      await db
        .select()
        .from(electionProposals)
        .where(eq(electionProposals.election_id, election_id))
        .orderBy(desc(electionProposals.id));
    } catch (error) {
      console.error("Error fetching proposals for election:", error);
      return [];
    }
  }

  return {
    initiateElectionInDb,
    getElectionsFromDb,
    addProposalToElection,
    getProposalsForElectionFromDb,
  };
}

export type Repository = ReturnType<typeof createRepository>;
