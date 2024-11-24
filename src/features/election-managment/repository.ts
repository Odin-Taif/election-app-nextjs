import { elections } from "@/drizzle-db/schema";
import { ADD_PROPOSAL, INITIAT_EELECTION } from "./types";
import { db } from "@/drizzle-db";
import { sql } from "drizzle-orm";

export function createRepository() {
  async function initiateElectionInDb({ name }: INITIAT_EELECTION) {
    await db.insert(elections).values({ name });
  }
  async function addProposalToElection({ electionId, proposal }: ADD_PROPOSAL) {
    await db.execute(
      sql`
        UPDATE ${elections} 
        SET proposals = array_append(proposals, ${proposal})
        WHERE id = ${electionId}
      `
    );
  }

  async function getElectionsFromDb() {
    try {
      return await db.select().from(elections);
    } catch (error) {
      console.error("Error fetching elections:", error);
      return [];
    }
  }

  return {
    initiateElectionInDb,
    getElectionsFromDb,
    addProposalToElection,
  };
}

export type Repository = ReturnType<typeof createRepository>;
