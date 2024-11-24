import { electionProposals, elections } from "@/drizzle-db/schema";
import { INITIAT_EELECTION } from "./types";
import { db } from "@/drizzle-db";
import { desc, eq } from "drizzle-orm";

export function createRepository() {
  async function initiateElectionInDb({ name }: INITIAT_EELECTION) {
    return await db.insert(elections).values({ name });
  }

  interface ELECTION_PROPOSAL {
    election_id: number;
    proposal: string;
  }

  async function addProposalToElection({
    election_id,
    proposal,
  }: ELECTION_PROPOSAL) {
    try {
      // Log the values that are about to be inserted
      console.log("Inserting proposal:", { election_id, proposal });

      const result = await db
        .insert(electionProposals)
        .values({ election_id, proposal });

      // Log the result of the insert operation
      console.log("Insert result:", result);

      return result; // Return the result for further verification or success handling
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

      return proposals; // Return the list of proposals for the given election_id
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
