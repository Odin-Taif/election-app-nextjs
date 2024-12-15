"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { electionFeature } from ".";

export async function createElectionAction(
  prevState: unknown,
  payload: FormData
) {
  const name = payload.get("name") as string;
  const response = await electionFeature.service.addElection(name);

  if (response.success) {
    revalidatePath("/elections-registry");
    redirect("/elections-registry");
  } else {
    return {
      success: false,
      message: response.message || "Adding election failed",
      errors: response.errors as { name?: string },
    };
  }
}

export async function createProposalAction(
  prevState: unknown,
  payload: FormData
) {
  const election_id = parseInt(payload.get("election_id") as string, 10);
  const proposal = payload.get("proposal") as string;
  const response = await electionFeature.service.addProposal({
    election_id,
    proposal,
  });
  if (response.success) {
    revalidatePath("/elections-registry");
    return {
      success: true,
      message: response.message,
    };
  } else {
    return {
      success: false,
      message: response.message || "Adding proposal failed",
      errors: response.errors as { proposal?: string },
    };
  }
}
export async function runElectionAction(prevState: unknown, payload: FormData) {
  const election_id = parseInt(payload.get("election_id") as string, 10);
  try {
    // await electionFeature.service.runElection(election_id);
    revalidatePath("/elections-registry");
  } catch (error) {
    console.error("Error running election:", error);
  }
}

export async function runResultAction(election_id: number) {
  try {
    const electionResult = await electionFeature.service.getResult(election_id);
    console.log("Election result:", electionResult);
    revalidatePath("/elections-registry");
  } catch (error) {
    console.error("Error running election:", error);
  }
}
