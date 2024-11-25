import { publicVoters, votes } from "@/drizzle-db/schema";
import { db } from "@/drizzle-db";
import { PUBLIC_VOTER, VOTE } from "./types";

export function createRepository() {
  async function seedVoterInDb({ name }: PUBLIC_VOTER) {
    await db.insert(publicVoters).values({ name });
  }
  async function seedVotesInDb({
    public_voter_id,
    election_proposal_id,
    representative_id,
  }: VOTE) {
    try {
      await db.insert(votes).values({
        public_voter_id: public_voter_id,
        election_proposal_id: election_proposal_id,
        representative_id: representative_id,
      });
      console.log(
        `Vote inserted: Public Voter ID ${public_voter_id}, Proposal ID ${election_proposal_id}, Representative ID ${representativeId}`
      );
    } catch (error) {
      console.error("Error inserting vote:", error);
    }
  }

  return {
    seedVoterInDb,
    seedVotesInDb,
  };
}

export type Repository = ReturnType<typeof createRepository>;
