"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { feature } from ".";

export async function createElectionAction(
  prevState: unknown,
  payload: FormData
) {
  const name = payload.get("name") as string;
  const response = await feature.service.addElection(name);
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
  const response = await feature.service.addProposal({ election_id, proposal });
  if (response.success) {
    revalidatePath("/elections-registry");
  }
}
