import { Repository } from "./repository";
import { REPRESENTATIVE } from "./types";

export function createService(repository: Repository) {
  async function createRepresentativeService(representive: REPRESENTATIVE) {
    return await repository.setRepresentativeInDb(representive);
  }
  async function getElectionNamesToRunFor() {
    return await repository.getElectionNamesFromDb();
  }

  return {
    createRepresentativeService,
    getElectionNamesToRunFor,
  };
}
