import { Repository } from "./repository";
import { ELECTION_PROPOSAL, INITIAT_EELECTION } from "./types";

export function createService(repository: Repository) {
  async function createElectionService(election: INITIAT_EELECTION) {
    await repository.initiateElectionInDb(election);
  }
  async function getElections() {
    return await repository.getElectionsFromDb();
  }
  async function addProposalService(electionProposal: ELECTION_PROPOSAL) {
    return await repository.addProposalToElection(electionProposal);
  }
  async function getProposalsForElection(election_id: number) {
    return await repository.getProposalsForElectionFromDb(election_id);
  }
  async function getVotesCountsOnProposal() {
    return await repository.getVoteCountsOnProposalFromDb();
  }

  return {
    createElectionService,
    getElections,
    addProposalService,
    getProposalsForElection,
    getVotesCountsOnProposal,
  };
}
