import { PUBLIC_VOTER } from "@/features/public-managment/types";
import { faker } from "@faker-js/faker";
export async function generatePublicVoters(numberOfVoters: number) {
  const votes: PUBLIC_VOTER[] = [];
  Array.from({ length: numberOfVoters }).forEach(() => {
    const name = faker.person.fullName();
    votes.push({
      name,
    });
  });
  return votes;
}

// const seedAllData = async () => {
//   await seedElections(1);
//   await seedElectionProposals(2);
//   await seedRepresentatives(3, 1);
//   await seedPublicVoters(50);
//   await seedVotes(100, 1);
//   await seedPublicPreferences(2, 1);
//   await seedRepresentativePublicVotes(40);
//   console.log("Hurrra! Seeding all data is donne!");
// };

// seedAllData();
