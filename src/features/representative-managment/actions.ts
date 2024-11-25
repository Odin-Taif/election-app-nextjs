"use server";

import { revalidatePath } from "next/cache";
import {
  representativeFromSchema,
  representativeSchema,
} from "@/zod-validation/validations-schema";
import { representativeFeatureInstance } from "./feature";

export async function createRepresentativeAction(
  prevState: unknown,
  payload: FormData
) {
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

export async function RepresentativeFormAction(
  prevState: unknown,
  payload: FormData
) {
  const name = payload.get("name") as string;
  const email = payload.get("email") as string;
  const election_id_str = payload.get("election") as string;
  const election_id = election_id_str ? parseInt(election_id_str, 10) : null;
  const validation = representativeFromSchema.safeParse({
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
