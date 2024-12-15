import { Repository } from "./repository";
import { publicFeature } from ".";
import { electionFeature } from "../election-managment";
import { representativeFeature } from "../representative-managment";
import { db } from "@/drizzle-db";
import { publicPreferences } from "./schema";
import { PUBLIC_VOTER } from "./types";
import { faker } from "@faker-js/faker";
import { eq, and } from "drizzle-orm";

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
  async function getHighestPreferredProposal(electionId: number) {
    const result = await repository.getHighestPreferredProposal(electionId);
    return result;
  }
  async function seedPublicProposalPreference(electionId: number) {
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
        publicPreferences.push({
          public_voter_id: publicVoter.id,
          election_proposal_id: preferredProposal.id,
          electionId,
        });
      }
    }

    try {
      if (publicPreferences.length > 0) {
        await Promise.all(
          publicPreferences.map((preference) =>
            repository.addPublicPreferenceInDb(preference)
          )
        );
        console.log(
          `${publicPreferences.length} new Public Preferences seeded successfully`
        );
      }

      if (updatedPreferences.length > 0) {
        await Promise.all(
          updatedPreferences.map((preference) =>
            repository.updatePublicPreference(
              preference.public_voter_id,
              preference.election_proposal_id
            )
          )
        );
        console.log(
          `${updatedPreferences.length} Public Preferences updated successfully`
        );
      }
    } catch (error) {
      console.error("Error seeding or updating Public Preferences:", error);
    }
  }
  async function seedRepresentativePublicPreference(electionId: number) {
    const representatives =
      await representativeFeature.service.getAllRepresentatives();
    const publicVoters = await publicFeature.service.getPublicVoters();

    if (representatives.length === 0 || publicVoters.length === 0) {
      console.error("No representatives or public voters found.");
      return;
    }

    const existingPreferences = await db
      .select({
        public_voter_id: publicPreferences.public_voter_id,
        representative_id: publicPreferences.representative_id,
      })
      .from(publicPreferences)
      .where(eq(publicPreferences.election_id, electionId));
    const existingVoterIds = new Set(
      existingPreferences.map((preference) => preference.public_voter_id)
    );

    const newPreferences = [];
    const updatedPreferences = [];

    for (const publicVoter of publicVoters) {
      const randomRepresentative =
        representatives[Math.floor(Math.random() * representatives.length)];

      if (existingVoterIds.has(publicVoter.id)) {
        // Update the representative preference for existing voter
        updatedPreferences.push({
          public_voter_id: publicVoter.id,
          representative_id: randomRepresentative.id,
          election_id: electionId,
        });
      } else {
        // Add a new preference for voters without representatives
        newPreferences.push({
          public_voter_id: publicVoter.id,
          representative_id: randomRepresentative.id,
          election_id: electionId,
        });
      }
    }

    try {
      // Add new preferences
      if (newPreferences.length > 0) {
        await db.insert(publicPreferences).values(newPreferences);
        console.log(
          `${newPreferences.length} new Representative Public Preferences seeded successfully`
        );
      }

      // Update existing preferences
      if (updatedPreferences.length > 0) {
        await Promise.all(
          updatedPreferences.map((preference) =>
            db
              .update(publicPreferences)
              .set({
                representative_id: preference.representative_id,
              })
              .where(
                and(
                  eq(
                    publicPreferences.public_voter_id,
                    preference.public_voter_id
                  ),
                  eq(publicPreferences.election_id, preference.election_id)
                )
              )
          )
        );
        console.log(
          `${updatedPreferences.length} Representative Public Preferences updated successfully`
        );
      }
    } catch (error) {
      console.error(
        "Error seeding or updating Representative Public Preferences:",
        error
      );
    }
  }

  return {
    seedPublicVoters,
    getPublicVoters,
    seedPublicProposalPreference,
    seedRepresentativePublicPreference,
    getHighestPreferredProposal,
  };
}
