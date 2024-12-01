import { Repository } from "./repository";
import { publicFeature } from ".";
import { electionFeature } from "../election-managment";
import { representativeFeature } from "../representative-managment";
import { db } from "@/drizzle-db";
import { publicPreferences, publicVotes } from "./schema";
import { PUBLIC_VOTER } from "./types"; // Replace with actual path to PUBLIC_VOTER type
import { faker } from "@faker-js/faker";
import { eq, sql } from "drizzle-orm";

export function createService(repository: Repository) {
  async function seedPublicVoters(numberOfVoters: number) {
    const voters: PUBLIC_VOTER[] = Array.from({ length: numberOfVoters }).map(
      () => ({
        name: faker.person.fullName(),
      })
    );

    for (const voter of voters) {
      await repository.seedVoterInDb(voter); // Assumes this function seeds one voter at a time
    }

    return voters; // Optionally return the list of seeded voters if needed
  }
  async function getPublicVoters() {
    return await repository.getPublicVotersFromDb();
  }
  async function seedVotes(count: number, electionId: number) {
    try {
      const publicVoters = await publicFeature.service.getPublicVoters();
      const electionProposals =
        await electionFeature.service.getProposalsForElection(electionId);
      const representatives =
        await representativeFeature.service.getAllRepresentatives();
      if (
        !publicVoters.length ||
        !electionProposals.length ||
        !representatives.length
      ) {
        console.error(
          "Missing data: Ensure voters, proposals, and representatives are seeded first."
        );
        return;
      }
      const votesData = Array.from({ length: count }).map(() => {
        const public_voter_id =
          publicVoters[Math.floor(Math.random() * publicVoters.length)].id;
        const election_proposal_id =
          electionProposals[
            Math.floor(Math.random() * electionProposals.length)
          ].id;
        const representative_id =
          representatives[Math.floor(Math.random() * representatives.length)]
            .id;

        return {
          public_voter_id,
          election_proposal_id,
          representative_id,
        };
      });

      for (const vote of votesData) {
        await repository.seedVotesInDb(vote);
      }
      console.log(`${count} votes seeded successfully.`);
    } catch (error) {
      console.error("Error seeding votes:", error);
      throw error;
    }
  }
  async function seedPublicPreference(count: number, electionId: number) {
    const publicPreferences = [];
    const publicVoters = await publicFeature.service.getPublicVoters();
    const electionProposals =
      await electionFeature.service.getProposalsForElection(electionId);
    if (publicVoters.length === 0 || electionProposals.length === 0) {
      console.error("No public voters or election proposals found.");
      return;
    }
    for (let i = 0; i < count; i++) {
      const publicVoter =
        publicVoters[Math.floor(Math.random() * publicVoters.length)];
      const preferredProposal =
        electionProposals[Math.floor(Math.random() * electionProposals.length)];
      publicPreferences.push({
        public_voter_id: publicVoter.id,
        election_proposal_id: preferredProposal.id,
        electionId,
      });
    }
    for (const preference of publicPreferences) {
      await repository.addPublicPreferenceInDb(preference);
    }
    console.log(`${count} Public Preferences seeded successfully`);
  }
  async function seedRepresentativePublicVotes(count: number) {
    const representatives =
      await representativeFeature.service.getAllRepresentatives();
    const publicVoters = await publicFeature.service.getPublicVoters();

    if (representatives.length === 0 || publicVoters.length === 0) {
      console.error("No representatives or public voters found.");
      return;
    }
    const votesData = [];
    for (let i = 0; i < count; i++) {
      const representative =
        representatives[Math.floor(Math.random() * representatives.length)];
      const publicVoter =
        publicVoters[Math.floor(Math.random() * publicVoters.length)];

      votesData.push({
        representative_id: representative.id,
        public_voter_id: publicVoter.id,
      });
    }
    try {
      await db.insert(publicVotes).values(votesData);
      console.log(`${count} Representative Public Votes seeded successfully`);
    } catch (error) {
      console.error("Error seeding Representative Public Votes:", error);
    }
  }

  async function getHighestPreferredProposal(electionId: number) {
    const result = await repository.getHighestPreferredProposal(electionId);
    return result;
  }
  return {
    seedPublicVoters,
    getPublicVoters,
    seedVotes,
    seedPublicPreference,
    seedRepresentativePublicVotes,
    getHighestPreferredProposal,
  };
}
