import { Repository } from "./repository";
import { INITIAT_EELECTION } from "./types";

export function createService(repository: Repository) {
  async function createElectionService(election: INITIAT_EELECTION) {
    return await repository.initiateElectionInDb(election);
  }

  async function getElections() {
    return await repository.getElectionsFromDb();
  }
  return {
    createElectionService,
    getElections,
  };
}
