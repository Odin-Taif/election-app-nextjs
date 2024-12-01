"use server";
import { revalidatePath } from "next/cache";
import { electionFeature } from "../election-managment";

export async function runElectionAction(election_id: number) {
  try {
    await electionFeature.service.runElection(election_id);
    revalidatePath("/elections-registry");
  } catch (error) {
    console.error("Error running election:", error);
  }
}
