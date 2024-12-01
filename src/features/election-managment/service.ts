import {
  addElectionSchema,
  addProposalSchema,
} from "@/zod-validation/validations-schema";
import { Repository } from "./repository";
import { ELECTION_PROPOSAL } from "./types";

export function createService(repository: Repository) {
  async function addElection(name: string) {
    const validation = addElectionSchema.safeParse({ name });
    if (validation.success) {
      const response = await repository.initiateElectionInDb(validation.data);
      if (response.success) {
        return {
          success: response.success,
          message: "Election has been created!",
        };
      } else {
        return {
          success: response.success,
          message: "Creating an election has failed!",
        };
      }
    } else {
      return {
        success: false,
        message: "Validation has faild!",
        errors: validation.error.issues,
      };
    }
  }
  async function addProposal({ election_id, proposal }: ELECTION_PROPOSAL) {
    const validation = addProposalSchema.safeParse({
      election_id,
      proposal,
    });
    if (validation.success) {
      await repository.addProposalToElection({ election_id, proposal });
      return {
        success: true,
        message: "Election has been created!",
      };
    } else {
      return {
        success: false,
        message: "Validation has failed!",
        errors: validation.error.issues,
      };
    }
  }

  async function getElections() {
    return await repository.getElectionsFromDb();
  }
  async function getProposalsForElection(election_id: number) {
    return await repository.getProposalsForElectionFromDb(election_id);
  }
  async function getVotesCountsOnProposal() {
    return await repository.getVoteCountsOnProposalFromDb();
  }

  return {
    addElection,
    getElections,
    addProposal,
    getProposalsForElection,
    getVotesCountsOnProposal,
  };
}
