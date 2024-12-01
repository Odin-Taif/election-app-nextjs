import {
  addElectionSchema,
  addProposalSchema,
} from "@/zod-validation/validations-schema";
import { Repository } from "./repository";
import { ELECTION_PROPOSAL } from "./types";

export function createService(repository: Repository, publicServices: any) {
  async function addElection(name: string) {
    const validation = addElectionSchema.safeParse({ name });
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      const errorMessages: { name?: string } = {};
      if (errors.name && errors.name.length > 0) {
        errorMessages.name =
          "Election Name is required and should be a valid name.";
      }
      return {
        success: false,
        message: "Validation failed. Please check your input.",
        errors: errorMessages,
      };
    }
    try {
      await repository.initiateElectionInDb(validation.data);
      return {
        success: true,
        message: "Election has been created!",
      };
    } catch (dbError) {
      console.error("Database Error:", dbError);
      return {
        success: false,
        message: "An error occurred while saving the election to the database.",
        errors: dbError,
      };
    }
  }
  async function addProposal({ election_id, proposal }: ELECTION_PROPOSAL) {
    const validation = addProposalSchema.safeParse({
      election_id,
      proposal,
    });

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      const errorMessages: { proposal?: string } = {};
      if (errors.proposal && errors.proposal.length > 0) {
        errorMessages.proposal =
          "Election proposal is required and should be a valid proposal name.";
      }
      return {
        success: false,
        message: "Validation failed. Please check your input.",
        errors: errorMessages,
      };
    }
    try {
      await repository.addProposalToElection({ election_id, proposal });
      return {
        success: true,
        message: "Proposal has been added!",
        errors: {},
      };
    } catch (dbError) {
      console.error("Database Error:", dbError);
      return {
        success: false,
        message: "An error occurred while saving the proposal to the database.",
        errors: dbError,
      };
    }
  }
  async function getElections() {
    return await repository.getElectionsFromDb();
  }
  async function getProposalsForElection(election_id: number) {
    const preferredProposalId = await repository.getProposalsForElectionFromDb(
      election_id
    );
    return preferredProposalId;
  }
  async function getProposalById(proposalId: number) {
    const proposal = await repository.getProposalByIdFromDb(proposalId);
    return proposal;
  }
  async function runElection(election_id: number) {
    // await publicServices.seedPublicVoters(20);
    // await publicServices.getPublicVoters();
    // await publicServices.seedVotes(20, election_id);
    await publicServices.seedPublicPreference(10, election_id);
    await publicServices.seedRepresentativePublicVotes(10);
  }

  async function getResult(election_id: number) {
    return await publicServices.getHighestPreferredProposal(election_id);
  }

  return {
    addElection,
    getElections,
    addProposal,
    getProposalsForElection,
    runElection,
    getResult,
    getProposalById,
  };
}
