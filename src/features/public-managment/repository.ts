import { publicPreferences, publicVoters, publicVotes } from "./schema";
import { PREFERNCE, PUBLIC_VOTER, VOTE } from "./types";
import { db } from "@/drizzle-db";
import { eq, sql } from "drizzle-orm";

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
      await db.insert(publicVotes).values({
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
  async function getHighestPreferredProposal(electionId: number) {
    const result = await db
      .select({
        preferredProposalId: publicPreferences.preferred_proposal_id,
        proposalCount: sql<number>`COUNT(*)`.as("proposal_count"), // Alias explicitly
      })
      .from(publicPreferences)
      .where(eq(publicPreferences.election_id, electionId))
      .groupBy(publicPreferences.preferred_proposal_id)
      .orderBy(sql`COUNT(*) DESC`)
      .limit(1);

    return result[0] || null;
  }
  async function updatePublicPreference(
    publicVoterId: number,
    electionProposalId: number
  ) {
    try {
      await db
        .update(publicPreferences)
        .set({ preferred_proposal_id: electionProposalId })
        .where(eq(publicPreferences.public_voter_id, publicVoterId));

      console.log(`Public preference updated for voter ID: ${publicVoterId}`);
    } catch (error) {
      console.error(
        `Error updating public preference for voter ID: ${publicVoterId}`,
        error
      );
    }
  }
  async function getPublicPreferencesForElection(electionId: number) {
    try {
      const preferences = await db
        .select()
        .from(publicPreferences)
        .where(eq(publicPreferences.election_id, electionId));

      console.log(
        `Fetched ${preferences.length} preferences for election ID: ${electionId}`
      );
      return preferences;
    } catch (error) {
      console.error(
        `Error fetching public preferences for election ID: ${electionId}`,
        error
      );
      throw error;
    }
  }

  return {
    seedVoterInDb,
    seedVotesInDb,
    getPublicVotersFromDb,
    addPublicPreferenceInDb,
    getHighestPreferredProposal,
    updatePublicPreference,
    getPublicPreferencesForElection,
  };
}

export type Repository = ReturnType<typeof createRepository>;
