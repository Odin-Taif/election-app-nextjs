import { publicFeatureInstance } from "@/features/public-managment";
import { PublicVoter } from "@/features/public-managment/types";
import { faker } from "@faker-js/faker";

function generatePublicVotes(numberOfVoters: number): PublicVoter[] {
  const votes: PublicVoter[] = [];

  Array.from({ length: numberOfVoters }).forEach(() => {
    const id = Math.ceil(Math.random() * 100);
    const name = faker.person.fullName();

    votes.push({
      id,
      name,
    });
  });
  return votes;
}

export async function seedPublicVotes(numberOfVoters: number) {
  const voters = generatePublicVotes(numberOfVoters);
  for (const voter of voters) {
    await publicFeatureInstance.service.seedPublicVotesTable(voter);
  }
  console.log("done");
}
seedPublicVotes(10);
