"use server";
import { electionFeatureInstance } from "./feature";
import { ERORRS, INITIALSTATE_ELECTION_FORM } from "./types";
import { redirect } from "next/navigation";

export async function createElectionAction(
  state: INITIALSTATE_ELECTION_FORM | undefined,
  payload: FormData
) {
  try {
    console.log(payload);
    electionFeatureInstance.service.createElectionService(payload);
  } catch (errors: unknown) {
    console.error("create Election Errors:", errors);
    return {
      success: false,
      message: "Signup failed",
      errors: errors as ERORRS,
    };
  }

  redirect("/nominate-representive");
}
