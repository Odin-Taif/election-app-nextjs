import { publicPreferences, publicVoters, votes } from "./schema";
import { db } from "@/drizzle-db";
import { PREFERNCE, PUBLIC_VOTER, VOTE } from "./types";

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
        `Vote inserted: Public Voter ID ${public_voter_id}, Proposal ID ${election_proposal_id}, Representative ID ${representative_id}`
      );
    } catch (error) {
      console.error("Error inserting vote:", error);
    }
  }
  async function getPublicVotersFromDb() {
    const voters = await db.select().from(publicVoters);
    return voters;
  }
  async function addPublicPreferenceInDb({
    public_voter_id,
    election_proposal_id,
    electionId,
  }: PREFERNCE) {
    try {
      const newPreference = await db.insert(publicPreferences).values({
        public_voter_id,
        election_id: electionId,
        preferred_proposal_id: election_proposal_id,
      });

      console.log("Public preference added successfully:", newPreference);
      return newPreference;
    } catch (error) {
      console.error("Error inserting public preference:", error);
      throw error;
    }
  }
  return {
    seedVoterInDb,
    seedVotesInDb,
    getPublicVotersFromDb,
    addPublicPreferenceInDb,
  };
}

export type Repository = ReturnType<typeof createRepository>;
