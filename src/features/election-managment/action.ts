"use server";

import { revalidatePath } from "next/cache";
import { electionFeatureInstance } from "./feature";
import { redirect } from "next/navigation";
import { electionSchema } from "@/zod-validation/validations-schema";

export async function createElectionAction(prevState: any, payload: FormData) {
  const validation = electionSchema.safeParse({
    name: payload.get("name"),
    proposal: payload.get("proposal"),
  });

  if (validation.success) {
    await electionFeatureInstance.service.createElectionService(payload);
    redirect("/nominate-representive");
  } else {
    return {
      errors: validation.error.issues,
    };
  }
}
