"use server";

import { revalidatePath } from "next/cache";
import { representativeFeature } from ".";
import { electionFeature } from "../election-managment";

export async function createRepresentativeAction(
  prevState: unknown,
  payload: FormData
) {
  const name = payload.get("name") as string;
  const email = payload.get("email") as string;
  const election_id = parseInt(payload.get("election") as string, 10);

  const response = await representativeFeature.service.addRepresentative({
    name,
    email,
    election_id,
  });
  if (response.success) {
    await electionFeature.service.choseRepresentative(election_id);
    revalidatePath("/elections-registry");
    return {
      success: true,
      message: response.message,
    };
  } else {
    return {
      success: false,
      message: response.message || "Adding representative failed!",
      errors: response.errors as { name?: string; email?: string },
    };
  }
}
