"use server";
import { electionFeature } from "../election-managment";

export async function runElectionAction(election_id: number) {
  try {
    const result = await electionFeature.service.runElection(election_id);
    console.log("Election result:", result);
  } catch (error) {
    console.error("Error running election:", error);
  }
}
