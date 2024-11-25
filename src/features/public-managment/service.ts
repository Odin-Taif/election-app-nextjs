import { Repository } from "./repository";
import { PUBLIC_VOTER, VOTE, PREFERNCE } from "./types";

export function createService(repository: Repository) {
  async function seedPublicVotersTable(voter: PUBLIC_VOTER) {
    return await repository.seedVoterInDb(voter);
  }
  async function seedVotesTable(vote: VOTE) {
    return await repository.seedVotesInDb(vote);
  }
  async function getPublicVoters() {
    return await repository.getPublicVotersFromDb();
  }
  async function addPublicPreference(preference: PREFERNCE) {
    return await repository.addPublicPreferenceInDb(preference);
  }
  return {
    seedPublicVotersTable,
    seedVotesTable,
    getPublicVoters,
    addPublicPreference,
  };
}
