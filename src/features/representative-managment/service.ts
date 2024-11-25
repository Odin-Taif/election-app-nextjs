import { Repository } from "./repository";
import { REPRESENTATIVE } from "./types";

export function createService(repository: Repository) {
  async function createRepresentativeService(representive: REPRESENTATIVE) {
    return await repository.setRepresentativeInDb(representive);
  }

  async function getElectionNamesToRunFor() {
    return await repository.getElectionNamesFromDb();
  }

  async function getRepresentativesByElection(election_id: number) {
    return await repository.getRepresentativesByElectionNameFromDb(election_id);
  }

  async function getAllRepresentatives() {
    return await repository.getAllRepresentativesFromDb();
  }

  return {
    createRepresentativeService,
    getElectionNamesToRunFor,
    getRepresentativesByElection,
    getAllRepresentatives,
  };
}
