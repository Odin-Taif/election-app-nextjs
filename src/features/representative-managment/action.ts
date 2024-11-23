"use server";

import { revalidatePath } from "next/cache";

import { ERORRS, INITIALSTATE_REPRESENTATIVE_FORM } from "./types";
import { repersentativeFeature } from "./feature";

export async function createRepresentativeAction(
  state: INITIALSTATE_REPRESENTATIVE_FORM | undefined,
  payload: FormData
) {
  try {
    console.log(payload);

    repersentativeFeature.service.createRepresentativeService(payload);
  } catch (errors: unknown) {
    console.error("create Election Errors:", errors);
    return {
      success: false,
      message: "Signup failed",
      errors: errors as ERORRS,
    };
  }

  revalidatePath("/nominate-representive");
  // redirect("/nominate-representive");
}
