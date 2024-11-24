"use server";

import { revalidatePath } from "next/cache";
import { representativeSchema } from "@/zod-validation/validations-schema";
import { repersentativeFeature } from "./feature";
import { redirect } from "next/navigation";
export async function createRepresentativeAction(
  prevState: any,
  payload: FormData
) {
  const validation = representativeSchema.safeParse({
    name: payload.get("name"),
    email: payload.get("email"),
    election: payload.get("election"),
  });
  if (validation.success) {
    await repersentativeFeature.service.createRepresentativeService(
      validation.data
    );
    revalidatePath("/nominate-representive");
    // redirect("/nominate-representive");
  } else {
    return {
      errors: validation.error.issues,
    };
  }
}
