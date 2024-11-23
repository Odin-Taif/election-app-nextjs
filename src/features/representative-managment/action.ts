"use server";

import { representiveFeatureInstance } from "./feature";
import { ERORRS, INITIALSTATE_REPRESENTATIVE_FORM } from "./types";

export async function createRepresentativeAction(
  state: INITIALSTATE_REPRESENTATIVE_FORM | undefined,
  payload: FormData
) {
  try {
    // console.log(
    //   "will talk to the singletone instance of the representative managment feature"
    // );

    console.log(payload);

    representiveFeatureInstance.service.createRepresentativeService(payload);
  } catch (errors: unknown) {
    console.error("create Election Errors:", errors);
    return {
      success: false,
      message: "Signup failed",
      errors: errors as ERORRS,
    };
  }
}
