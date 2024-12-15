import { representativeSchema } from "@/zod-validation/validations-schema";
import { Repository } from "./repository";
import { REPRESENTATIVE } from "./types";

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
        errorMessages.email =
          "Email is required and should be a valid email name.";
      }
      return {
        success: false,
        message: "Validation failed. Please check your input.",
        errors: errorMessages,
      };
    }
    try {
      const response = await repository.addRepresentativeInDb(validation.data);
      if (response.success) {
        return {
          success: response.success,
          message: response.message,
        };
      }
      return {
        success: response.success,
        message: response.message,
        error: response.error,
      };
    } catch (dbError) {
      console.error("Database Error:", dbError);
      return {
        success: false,
        message:
          "An error occurred while saving the representative to the database.",
        errors: dbError,
      };
    }
  }

  async function getRepresentativesByElection(election_id: number) {
    return await repository.getRepresentativesByElectionNameFromDb(election_id);
  }

  async function getAllRepresentatives() {
    return await repository.getAllRepresentativesFromDb();
  }
  async function getReprensentativeById(id: number) {
    return await repository.getReprensentativeById(id);
  }

  return {
    addRepresentative,
    getRepresentativesByElection,
    getAllRepresentatives,
    getReprensentativeById,
  };
}
