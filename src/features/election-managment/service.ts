import { Repository } from "./repository";
import { ADD_PROPOSAL, INITIAT_EELECTION } from "./types";

export function createService(repository: Repository) {
  async function createElectionService(election: INITIAT_EELECTION) {
    return await repository.initiateElectionInDb(election);
  }

  async function getElections() {
    return await repository.getElectionsFromDb();
  }
  async function addProposalService(electionProposal: ADD_PROPOSAL) {
    return await repository.addProposalToElection(electionProposal);
  }
  return {
    createElectionService,
    getElections,
    addProposalService,
  };
}
