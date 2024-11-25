import { publicFeatureInstance } from "@/features/public-managment";
import { PUBLIC_VOTER, VOTE } from "@/features/public-managment/types";
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
export async function seedPublicVoters(numberOfVoters: number) {
  const voters = generatePublicVoters(numberOfVoters);
  for (const voter of voters) {
    await publicFeatureInstance.service.seedPublicVotersTable(voter);
  }
  console.log("done");
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
export async function seedVotes(numberOfVotes: number) {
  const votes = generateVotes(numberOfVotes);
  for (const vote of votes) {
    await publicFeatureInstance.service.seedVotesTable(vote);
  }
  console.log("Votes seeded successfully");
}

seedPublicVoters(2);
seedVotes(2);
