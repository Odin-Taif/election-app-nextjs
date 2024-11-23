import { representativeSchema } from "@/zod-validation/validations-schema";
import { Repository } from "./repository";

export function createService(repository: Repository) {
  return {
    async createRepresentativeService(formData: FormData) {
      const name = formData.get("name")?.toString();
      const election = formData.get("election")?.toString();
      const userValidated = representativeSchema.safeParse({ name, election });
      if (!userValidated.success) {
        const errors = userValidated.error.flatten().fieldErrors;
        const errorMessages: Record<string, string> = {};

        if (errors.name) {
          errorMessages.name =
            "Name is required and should be at least 3 characters long.";
        }

        if (errors.election) {
          errorMessages.election = "Election is required ";
        }

        return {
          success: false,
          message: "Validation failed. Please check your input.",
          errors: errorMessages,
        };
      }
      await repository.setRepesentativeInDb(userValidated.data);
    },

    async getElectionNamesToRunFor() {
      return await repository.getElectionNamesFromDb();
    },
  };
}
