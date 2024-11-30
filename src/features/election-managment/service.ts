import { addElectionSchema } from "@/zod-validation/validations-schema";
import { Repository } from "./repository";
import { ELECTION_PROPOSAL } from "./types";

export function createService(repository: Repository) {
  async function createElectionService(name: string) {
    const validation = addElectionSchema.safeParse({ name });
    if (validation.success) {
      await repository.initiateElectionInDb(validation.data);
      return {
        success: true,
        message: "Election has been created!",
      };
    } else {
      return {
        success: false,
        message: "Operation has faild!",
        errors: validation.error.issues,
      };
    }
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
