import { Repository } from "./repository";
import { PUBLIC_VOTER } from "./types";

export function createService(repository: Repository) {
  async function seedPublicVotesTable(voter: PUBLIC_VOTER) {
    return await repository.seedVoterInDb(voter);
  }
  return {
    seedPublicVotesTable,
  };
}
