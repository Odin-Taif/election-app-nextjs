import { representativeSchema } from "@/zod-validation/validations-schema";
import { Repository } from "./repository";

export function createService(repository: Repository) {
  function createRepresentativeService(formData: FormData) {
    const name = formData.get("name")?.toString();
    const userValidated = representativeSchema.safeParse({ name });
    if (!userValidated.success) {
      const errors = userValidated.error.flatten().fieldErrors;
      const errorMessages: Record<string, string> = {};

      if (errors.name) {
        errorMessages.name =
          "Name is required and should be at least 3 characters long.";
      }

      return {
        success: false,
        message: "Validation failed. Please check your input.",
        errors: errorMessages,
      };
    }
    repository.setRepesentativeInDb(userValidated.data);
  }
  return {
    createRepresentativeService,
  };
}
