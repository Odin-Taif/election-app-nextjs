"use server";

export async function createElectionAction(
  state: INITIALSTATE_REPRESENTIVE_FORM | undefined,
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
      errors: errors as CREATE_REPRESENTIVE_ERORRS,
    };
  }
}
