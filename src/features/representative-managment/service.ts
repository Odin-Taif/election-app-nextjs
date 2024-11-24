import { Repository } from "./repository";
import { REPRESENTATIVE } from "./types";

export function createService(repository: Repository) {
  async function createRepresentativeService(representive: REPRESENTATIVE) {
    return await repository.setRepresentativeInDb(representive);
  }
  async function getElectionNamesToRunFor() {
    return await repository.getElectionNamesFromDb();
  }

  async function getRepresentativesByElectionName(electionName: string) {
    return await repository.getRepresentativesByElectionNameFromDb(
      electionName
    );
  }

  return {
    createRepresentativeService,
    getElectionNamesToRunFor,
    getRepresentativesByElectionName,
  };
}
