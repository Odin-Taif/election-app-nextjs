"use server";
import { feature } from "./feature";
import { addProposalSchema } from "@/zod-validation/validations-schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createElectionAction(
  prevState: unknown,
  payload: FormData
) {
  const name = payload.get("name") as string;
  const response = await feature.service.createElectionService(name);
  if (response.success) {
    revalidatePath("/elections-registry");
    redirect("/elections-registry");
  }
}

export async function createProposalAction(
  prevState: unknown,
  payload: FormData
) {
  const election_id = parseInt(payload.get("election_id") as string, 10);
  const proposal = payload.get("proposal") as string;
  const validation = addProposalSchema.safeParse({
    election_id,
    proposal,
  });

  if (validation.success) {
    await feature.service.addProposalService(validation.data);
    revalidatePath("/elections-registry");
  } else {
    return {
      errors: validation.error.issues,
    };
  }
}
