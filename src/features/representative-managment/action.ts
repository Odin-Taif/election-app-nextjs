"use server";

import { revalidatePath } from "next/cache";
import { representativeSchema } from "@/zod-validation/validations-schema";
import { representativeFeatureInstance } from "./feature";

export async function createRepresentativeAction(prevState, payload: FormData) {
  const name = payload.get("name") as string;
  const email = payload.get("email") as string;
  const election_id = parseInt(payload.get("election") as string, 10);
  const validation = representativeSchema.safeParse({
    name,
    email,
    election_id,
  });

  if (validation.success) {
    const userExist =
      await representativeFeatureInstance.service.createRepresentativeService(
        validation.data
      );
    if (userExist.success) {
      revalidatePath("/elections-registry");
      return {
        success: true,
        errors: userExist.error,
        message: userExist.message,
      };
    }
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
export async function RepresentativeFormAction(prevState, payload: FormData) {
  const validation = representativeSchema.safeParse({
    name: payload.get("name"),
    email: payload.get("email"),
    election: payload.get("election"),
  });

  if (validation.success) {
    const userExist =
      await representativeFeatureInstance.service.createRepresentativeService(
        validation.data
      );
    if (userExist.success) {
      revalidatePath("/elections-registry");
      return {
        success: true,
        errors: userExist.error,
        message: userExist.message,
      };
    }
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
