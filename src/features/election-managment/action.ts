"use server";

import { CREATE_ELECTION_ERORRS, INITIALSTATE_ELECTION_FORM } from "./types";

export async function createElectionAction(
  state: INITIALSTATE_ELECTION_FORM | undefined,
  payload: FormData
) {
  try {
    console.log(
      "will talk to the singletone instance of the election managment feature"
    );

    console.log(payload);
  } catch (errors: unknown) {
    console.error("create Election Errors:", errors);
    return {
      success: false,
      message: "Signup failed",
      errors: errors as CREATE_ELECTION_ERORRS,
    };
  }
}
