// import { db } from "@/drizzle-db";
// import { feature as electionFeature } from "@/features/election-managment";
// import { publicFeatureInstance } from "@/features/public-managment";
// import { PUBLIC_VOTER } from "@/features/public-managment/types";
// import { feature as representativeFeature } from "@/features/representative-managment";
// import { faker } from "@faker-js/faker";

// function generatePublicVoters(numberOfVoters: number): PUBLIC_VOTER[] {
//   const votes: PUBLIC_VOTER[] = [];
//   Array.from({ length: numberOfVoters }).forEach(() => {
//     const name = faker.person.fullName();
//     votes.push({
//       name,
//     });
//   });
//   return votes;
// }
// export const seedElections = async (count: number) => {
//   const elections = [];
//   for (let i = 0; i < count; i++) {
//     elections.push({
//       name: `Election ${i + 1}`,
//     });
//   }
//   for (const election of elections) {
//     await electionFeature.service.addElection(election);
//   }
//   console.log("Elections seeded successfully");
// };
// export const seedElectionProposals = async (count: number) => {
//   const proposals = [];
//   for (let i = 0; i < count; i++) {
//     proposals.push({
//       election_id: 1,
//       proposal: `Proposal ${i + 1}`,
//     });
//   }
//   for (const proposal of proposals) {
//     await electionFeature.service.addProposal(proposal);
//   }
//   console.log("Election Proposals seeded successfully");
// };
// export const seedRepresentatives = async (
//   count: number,
//   electionId: number
// ) => {
//   const representatives = [];

//   for (let i = 0; i < count; i++) {
//     representatives.push({
//       email: `representative${i + 1}@example.com`,
//       name: `Representative ${i + 1}`,
//       election_id: electionId,
//     });
//   }
//   for (const representative of representatives) {
//     await representativeFeature.service.addRepresentative(representative);
//   }
//   console.log(`${count} Representatives seeded successfully`);
// };
// export async function seedPublicVoters(numberOfVoters: number) {
//   const voters = generatePublicVoters(numberOfVoters);
//   for (const voter of voters) {
//     await publicFeatureInstance.service.seedPublicVotersTable(voter);
//   }
//   console.log("seed PublicVoters is done");
// }
// export const seedVotes = async (count: number, electionId: number) => {
//   try {
//     const publicVoters = await publicFeatureInstance.service.getPublicVoters();
//     const electionProposals =
//       await electionFeature.service.getProposalsForElection(electionId);
//     const representatives =
//       await representativeFeature.service.getAllRepresentatives();

//     if (
//       !publicVoters.length ||
//       !electionProposals.length ||
//       !representatives.length
//     ) {
//       console.error(
//         "Missing data: Ensure voters, proposals, and representatives are seeded first."
//       );
//       return;
//     }
//     const votesData = Array.from({ length: count }).map(() => {
//       const public_voter_id =
//         publicVoters[Math.floor(Math.random() * publicVoters.length)].id;
//       const election_proposal_id =
//         electionProposals[Math.floor(Math.random() * electionProposals.length)]
//           .id;
//       const representative_id =
//         representatives[Math.floor(Math.random() * representatives.length)].id;

//       return {
//         public_voter_id,
//         election_proposal_id,
//         representative_id,
//       };
//     });

//     for (const vote of votesData) {
//       await db.insert(votes).values(vote);
//     }

//     console.log(`${count} votes seeded successfully.`);
//   } catch (error) {
//     console.error("Error seeding votes:", error);
//     throw error;
//   }
// };
// export const seedPublicPreferences = async (
//   count: number,
//   electionId: number
// ) => {
//   const publicPreferences = [];
//   const publicVoters = await publicFeatureInstance.service.getPublicVoters();
//   const electionProposals =
//     await electionFeature.service.getProposalsForElection(electionId);
//   if (publicVoters.length === 0 || electionProposals.length === 0) {
//     console.error("No public voters or election proposals found.");
//     return;
//   }
//   for (let i = 0; i < count; i++) {
//     const publicVoter =
//       publicVoters[Math.floor(Math.random() * publicVoters.length)];
//     const preferredProposal =
//       electionProposals[Math.floor(Math.random() * electionProposals.length)];

//     publicPreferences.push({
//       public_voter_id: publicVoter.id,
//       election_proposal_id: preferredProposal.id,
//       electionId, // Ensure electionId is passed here
//     });
//   }
//   for (const preference of publicPreferences) {
//     await publicFeatureInstance.service.addPublicPreference(preference);
//   }
//   console.log(`${count} Public Preferences seeded successfully`);
// };
// export const seedRepresentativePublicVotes = async (count: number) => {
//   const representatives =
//     await representativeFeature.service.getAllRepresentatives();
//   const publicVoters = await publicFeatureInstance.service.getPublicVoters();

//   if (representatives.length === 0 || publicVoters.length === 0) {
//     console.error("No representatives or public voters found.");
//     return;
//   }
//   const votesData = [];
//   for (let i = 0; i < count; i++) {
//     const representative =
//       representatives[Math.floor(Math.random() * representatives.length)];
//     const publicVoter =
//       publicVoters[Math.floor(Math.random() * publicVoters.length)];

//     // Add the relationship to the array
//     votesData.push({
//       representative_id: representative.id,
//       public_voter_id: publicVoter.id,
//     });
//   }

//   try {
//     await db.insert(representativePublicVotes).values(votesData);
//     console.log(`${count} Representative Public Votes seeded successfully`);
//   } catch (error) {
//     console.error("Error seeding Representative Public Votes:", error);
//   }
// };

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
