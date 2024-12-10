import { Repository } from "./repository";
import { publicFeature } from ".";
import { electionFeature } from "../election-managment";
import { representativeFeature } from "../representative-managment";
import { db } from "@/drizzle-db";
import { publicVotes } from "./schema";
import { PUBLIC_VOTER } from "./types";
import { faker } from "@faker-js/faker";

export function createService(repository: Repository) {
  async function seedPublicVoters(numberOfVoters: number) {
    const voters: PUBLIC_VOTER[] = Array.from({ length: numberOfVoters }).map(
      () => ({
        name: faker.person.fullName(),
      })
    );

    for (const voter of voters) {
      await repository.seedVoterInDb(voter);
    }

    return voters;
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
    const publicVoters = await publicFeature.service.getPublicVoters();
    const electionProposals =
      await electionFeature.service.getProposalsForElection(electionId);

    if (publicVoters.length === 0 || electionProposals.length === 0) {
      console.error("No public voters or election proposals found.");
      return;
    }
    const existingPreferences =
      await repository.getPublicPreferencesForElection(electionId);
    const existingVoterIds = new Set(
      existingPreferences.map((p) => p.public_voter_id)
    );
    if (count > publicVoters.length) {
      console.error(
        "Requested count exceeds the number of available public voters."
      );
      return;
    }
    const publicPreferences = [];
    const updatedPreferences = [];
    for (const publicVoter of publicVoters) {
      const preferredProposal =
        electionProposals[Math.floor(Math.random() * electionProposals.length)];

      if (existingVoterIds.has(publicVoter.id)) {
        updatedPreferences.push({
          public_voter_id: publicVoter.id,
          election_proposal_id: preferredProposal.id,
          electionId,
        });
      } else {
        if (publicPreferences.length < count) {
          publicPreferences.push({
            public_voter_id: publicVoter.id,
            election_proposal_id: preferredProposal.id,
            electionId,
          });
        }
      }
    }
    try {
      if (publicPreferences.length > 0) {
        for (const preference of publicPreferences) {
          await repository.addPublicPreferenceInDb(preference);
        }
        console.log(
          `${publicPreferences.length} new Public Preferences seeded successfully`
        );
      }
      if (updatedPreferences.length > 0) {
        for (const preference of updatedPreferences) {
          await repository.updatePublicPreference(
            preference.public_voter_id,
            preference.election_proposal_id
          );
        }
        console.log(
          `${updatedPreferences.length} Public Preferences updated successfully`
        );
      }
    } catch (error) {
      console.error("Error seeding or updating Public Preferences:", error);
    }
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
