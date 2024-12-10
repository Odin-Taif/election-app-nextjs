import {
  addElectionSchema,
  addProposalSchema,
} from "@/zod-validation/validations-schema";
import { Repository } from "./repository";
import { ELECTION_PROPOSAL, PUBLIC_SERVICE_METHODS } from "./types";

export function createService(
  repository: Repository,
  publicServicesMethods: PUBLIC_SERVICE_METHODS
) {
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
      await publicServicesMethods.seedPublicVoters(50);
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

  const executedElections = new Set<number>();
  async function runElection(election_id: number) {
    await publicServicesMethods.getPublicVoters();
    if (!executedElections.has(election_id)) {
      executedElections.add(election_id);
      await publicServicesMethods.seedVotes(50, election_id);
      await publicServicesMethods.seedPublicPreference(50, election_id);
    }
    await publicServicesMethods.seedRepresentativePublicVotes(10);
  }

  async function getResult(election_id: number) {
    return await publicServicesMethods.getHighestPreferredProposal(election_id);
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
