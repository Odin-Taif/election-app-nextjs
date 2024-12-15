import { representativeSchema } from "@/zod-validation/validations-schema";
import { Repository } from "./repository";
import { REPRESENTATIVE } from "./types";
import { electionFeature } from "../election-managment";

export function createService(repository: Repository) {
  async function addRepresentative({
    name,
    email,
    election_id,
  }: REPRESENTATIVE) {
    const validation = representativeSchema.safeParse({
      name,
      email,
      election_id,
    });

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      const errorMessages: { name?: string; email?: string } = {};
      if (errors.name && errors.name.length > 0) {
        errorMessages.name = "Name is required and should be a valid name.";
      }
      if (errors.email && errors.email.length > 0) {
        errorMessages.email = "Email is required and should be a valid email.";
      }
      return {
        success: false,
        message: "Validation failed. Please check your input.",
        errors: errorMessages,
      };
    }

    try {
      const electionProposals =
        await electionFeature.service.getProposalsForElection(
          validation.data.election_id
        );
      if (electionProposals.length === 0) {
        return {
          success: false,
          message: "No proposals available for this election.",
        };
      }
      const randomProposal =
        electionProposals[Math.floor(Math.random() * electionProposals.length)];

      const response = await repository.addRepresentativeInDb(
        validation.data.name,
        validation.data.email,
        validation.data.election_id,
        randomProposal.id
      );
      if (!response.success) {
        return {
          success: response.success,
          message: response.message,
          error: response.error,
        };
      }

      // await updateRepresentativePreference(preference);

      return {
        success: true,
        message: "Representative created and proposal assigned successfully.",
      };
    } catch (error) {
      console.error("Error in addRepresentative:", error);
      return {
        success: false,
        message: "An error occurred while processing the request.",
        errors: error,
      };
    }
  }

  async function getRepresentativesByElection(election_id: number) {
    return await repository.getRepresentativePreferencesForElection(
      election_id
    );
  }
  async function getAllRepresentatives() {
    return await repository.getAllRepresentativesFromDb();
  }
  async function getReprensentativeById(id: number) {
    return await repository.getReprensentativeById(id);
  }
  async function getRepresentativePreferencesForElection(election_id: number) {
    return await repository.getRepresentativePreferencesForElection(
      election_id
    );
  }

  return {
    addRepresentative,
    getRepresentativesByElection,
    getAllRepresentatives,
    getReprensentativeById,
  };
}
