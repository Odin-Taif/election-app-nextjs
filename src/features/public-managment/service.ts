import { Repository } from "./repository";
import { PUBLIC_VOTER, VOTE } from "./types";

export function createService(repository: Repository) {
  async function seedPublicVotersTable(voter: PUBLIC_VOTER) {
    return await repository.seedVoterInDb(voter);
  }
  async function seedVotesTable(vote: VOTE) {
    return await repository.seedVotesInDb(vote);
  }
  return {
    seedPublicVotersTable,
    seedVotesTable,
  };
}
