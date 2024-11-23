import { electionSchema } from "@/zod-validation/validations-schema";
import { Repository } from "./repository";

export function createService(repository: Repository) {
  async function createElectionService(formData: FormData) {
    const name = formData.get("name")?.toString();
    const proposal = formData.get("proposal")?.toString();
    const electionValidated = electionSchema.safeParse({ name, proposal });
    if (!electionValidated.success) {
      const errors = electionValidated.error.flatten().fieldErrors;
      const errorMessages: Record<string, string> = {};

      if (errors.name) {
        errorMessages.name =
          "Name is required and should be at least 3 characters long.";
      }
      if (errors.proposal) {
        errorMessages.proposal =
          "Proposal is required and should be at least 3 characters long.";
      }
      return {
        success: false,
        message: "Validation failed. Please check your input.",
        errors: errorMessages,
      };
    }
    await repository.initiateElectionInDb(electionValidated.data);
  }
  return {
    createElectionService,
  };
}
