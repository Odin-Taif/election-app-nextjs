"use server";

import { revalidatePath } from "next/cache";
import { representativeSchema } from "@/zod-validation/validations-schema";
import { repersentativeFeature } from "./feature";

export async function createRepresentativeAction(prevState, payload: FormData) {
  const validation = representativeSchema.safeParse({
    name: payload.get("name"),
    email: payload.get("email"),
    election: payload.get("election"),
  });

  if (validation.success) {
    const userExist =
      await repersentativeFeature.service.createRepresentativeService(
        validation.data
      );
    if (userExist.success) {
      return {
        success: true,
        errors: userExist.error,
        message: userExist.message,
      };
    }
    console.log(userExist, "user exist");
    revalidatePath("/nominate-represntative");
    return {
      success: userExist.success,
      errors: userExist.error,
      message: userExist.message,
    };
  } else {
    return {
      success: false,
      errors: validation.error.issues,
      message: validation.error.message,
    };
  }
}
