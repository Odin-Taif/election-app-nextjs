import { db } from "@/drizzle-db";
import { representativePublicVotes } from "@/drizzle-db/schema";
import { electionFeatureInstance } from "@/features/election-managment";
import { publicFeatureInstance } from "@/features/public-managment";
import { PUBLIC_VOTER, VOTE } from "@/features/public-managment/types";
import { repersentativeFeature } from "@/features/representative-managment";
import { faker } from "@faker-js/faker";
const publicVoters = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
const electionProposals = [{ id: 1 }, { id: 2 }, { id: 3 }];
const representatives = [{ id: 1 }, { id: 2 }];

function generatePublicVoters(numberOfVoters: number): PUBLIC_VOTER[] {
  const votes: PUBLIC_VOTER[] = [];

  Array.from({ length: numberOfVoters }).forEach(() => {
    const id = Math.ceil(Math.random() * 100);
    const name = faker.person.fullName();

    votes.push({
      name,
    });
  });
  return votes;
}
function generateVotes(numberOfVotes: number): VOTE[] {
  const votes: VOTE[] = [];
  Array.from({ length: numberOfVotes }).forEach(() => {
    const public_voter_id =
      publicVoters[Math.floor(Math.random() * publicVoters.length)].id;
    const election_proposal_id =
      electionProposals[Math.floor(Math.random() * electionProposals.length)]
        .id;
    const representative_id =
      representatives[Math.floor(Math.random() * representatives.length)].id;

    votes.push({
      public_voter_id,
      election_proposal_id,
      representative_id,
    });
  });

  return votes;
}
export const seedElections = async (count: number) => {
  const elections = [];
  for (let i = 0; i < count; i++) {
    elections.push({
      name: `Election ${i + 1}`,
    });
  }

  for (const election of elections) {
    await electionFeatureInstance.service.createElectionService(election); // Insert election into the DB
  }

  console.log("Elections seeded successfully");
};
export const seedElectionProposals = async (count: number) => {
  const proposals = [];
  for (let i = 0; i < count; i++) {
    proposals.push({
      election_id: 1, // assuming election_id 1 exists
      proposal: `Proposal ${i + 1}`,
    });
  }
  for (const proposal of proposals) {
    await electionFeatureInstance.service.addProposalService(proposal);
  }
  console.log("Election Proposals seeded successfully");
};
export const seedRepresentatives = async (
  count: number,
  electionId: number
) => {
  const representatives = [];

  for (let i = 0; i < count; i++) {
    representatives.push({
      email: `representative${i + 1}@example.com`,
      name: `Representative ${i + 1}`,
      election_id: electionId,
    });
  }

  for (const representative of representatives) {
    await repersentativeFeature.service.createRepresentativeService(
      representative
    );
  }

  console.log(`${count} Representatives seeded successfully`);
};
export async function seedPublicVoters(numberOfVoters: number) {
  const voters = generatePublicVoters(numberOfVoters);
  for (const voter of voters) {
    await publicFeatureInstance.service.seedPublicVotersTable(voter);
  }
  console.log("seed PublicVoters is done");
}
export async function seedVotes(numberOfVotes: number) {
  const votes = generateVotes(numberOfVotes);
  for (const vote of votes) {
    await publicFeatureInstance.service.seedVotesTable(vote);
  }
  console.log("Votes seeded successfully");
}
export const seedPublicPreferences = async (
  count: number,
  electionId: number
) => {
  const publicPreferences = [];
  const publicVoters = await publicFeatureInstance.service.getPublicVoters();
  const electionProposals =
    await electionFeatureInstance.service.getProposalsForElection(electionId);
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
      electionId, // Ensure electionId is passed here
    });
  }
  for (const preference of publicPreferences) {
    await publicFeatureInstance.service.addPublicPreference(preference);
  }
  console.log(`${count} Public Preferences seeded successfully`);
};
export const seedRepresentativePublicVotes = async (count: number) => {
  const representatives =
    await repersentativeFeature.service.getAllRepresentatives();
  const publicVoters = await publicFeatureInstance.service.getPublicVoters();

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

    // Add the relationship to the array
    votesData.push({
      representative_id: representative.id,
      public_voter_id: publicVoter.id,
    });
  }

  try {
    await db.insert(representativePublicVotes).values(votesData);
    console.log(`${count} Representative Public Votes seeded successfully`);
  } catch (error) {
    console.error("Error seeding Representative Public Votes:", error);
  }
};

const seedAllData = async () => {
  await seedElections(100);
  await seedElectionProposals(4);
  await seedRepresentatives(5, 1);
  await seedPublicVoters(50);
  await seedPublicPreferences(5, 1);
  await seedRepresentativePublicVotes(10);
};

seedAllData();
