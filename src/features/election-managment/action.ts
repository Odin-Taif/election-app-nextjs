"use server";
import { electionFeatureInstance } from "./feature";
import { redirect } from "next/navigation";
import {
  addElectionSchema,
  addProposalSchema,
} from "@/zod-validation/validations-schema";
import { revalidatePath } from "next/cache";

export async function createElectionAction(prevState: any, payload: FormData) {
  const validation = addElectionSchema.safeParse({
    name: payload.get("name"),
  });

  if (validation.success) {
    await electionFeatureInstance.service.createElectionService(
      validation.data
    );
    revalidatePath("/elections-registry");
    redirect("/elections-registry");
  } else {
    return {
      errors: validation.error.issues,
    };
  }
}

export async function createProposalAction(prevState: any, payload: FormData) {
  const validation = addProposalSchema.safeParse({
    proposal: payload.get("proposal"),
    electionId: payload.get("electionId"),
  });

  if (validation.success) {
    await electionFeatureInstance.service.addProposalService(validation.data);
    revalidatePath("/elections-registry");
  } else {
    return {
      errors: validation.error.issues,
    };
  }
}
