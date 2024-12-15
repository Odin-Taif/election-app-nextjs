import { electionProposals, elections } from "./schema";
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
  async function getProposalByIdFromDb(proposalId: number) {
    try {
      const [proposal] = await db
        .select()
        .from(electionProposals)
        .where(eq(electionProposals.id, proposalId));
      return proposal;
    } catch (error) {
      console.error("Error fetching proposal:", error);
      throw new Error("Error fetching proposals");
    }
  }

  return {
    initiateElectionInDb,
    addProposalToElection,
    getElectionsFromDb,
    getProposalsForElectionFromDb,
    getProposalByIdFromDb,
  };
}

export type Repository = ReturnType<typeof createRepository>;
