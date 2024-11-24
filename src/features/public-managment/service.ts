import { Repository } from "./repository";
import { PublicVoter } from "./types";

export function createService(repository: Repository) {
  async function seedPublicVotesTable(voter: PublicVoter) {
    return await repository.seedVoterInDb(voter);
  }
  return {
    seedPublicVotesTable,
  };
}
