import { Repository } from "./repository";
import { INITIAT_EELECTION } from "./types";

export function createService(repository: Repository) {
  async function createElectionService(election: INITIAT_EELECTION) {
    await repository.initiateElectionInDb(election);
  }
  return {
    createElectionService,
  };
}
