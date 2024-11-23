import { elections } from "@/drizzle-db/schema";
import { INITIAT_EELECTION } from "./types";
import { db } from "@/drizzle-db";

export function createRepository() {
  async function initiateElectionInDb({ name }: INITIAT_EELECTION) {
    await db.insert(elections).values({ name });
  }

  return {
    initiateElectionInDb,
  };
}

export type Repository = ReturnType<typeof createRepository>;
