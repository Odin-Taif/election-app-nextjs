"use server";
import { electionFeatureInstance } from "./feature";
import { redirect } from "next/navigation";
import { addElectionSchema } from "@/zod-validation/validations-schema";
import { revalidatePath } from "next/cache";

export async function createElectionAction(prevState: any, payload: FormData) {
  console.log(payload);
  const validation = addElectionSchema.safeParse({
    name: payload.get("name"),
  });

  if (validation.success) {
    await electionFeatureInstance.service.createElectionService(
      validation.data
    );
    revalidatePath("/");
  } else {
    return {
      errors: validation.error.issues,
    };
  }
}

export async function createProposalAction(prevState: any, payload: FormData) {
  console.log(payload);
  const validation = addElectionSchema.safeParse({
    proposal: payload.get("proposal"),
  });

  if (validation.success) {
    await electionFeatureInstance.service.createElectionService(
      validation.data
    );
    redirect("/elections");
  } else {
    return {
      errors: validation.error.issues,
    };
  }
}
