import { Repository } from "./repository";
import { REPRESENTATIVE } from "./types";

export function createService(repository: Repository) {
  async function createRepresentativeService(representive: REPRESENTATIVE) {
    return await repository.setRepresentativeInDb(representive);
  }

  async function getElectionsToRunFor() {
    return await repository.getElectionsFromDb();
  }

  async function getRepresentativesByElection(election_id: number) {
    return await repository.getRepresentativesByElectionNameFromDb(election_id);
  }

  async function getAllRepresentatives() {
    return await repository.getAllRepresentativesFromDb();
  }
  async function getElectionWinners() {
    return await repository.getElectionWinners();
  }

  return {
    createRepresentativeService,
    getElectionsToRunFor,
    getRepresentativesByElection,
    getAllRepresentatives,
    getElectionWinners,
  };
}
