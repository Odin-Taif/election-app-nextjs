import { electionsTable } from "@/drizzle-db/schema";
import { ELECTION } from "./types";
import { db } from "@/drizzle-db";

export function createRepository() {
  async function initiateElectionInDb({ name, proposal }: ELECTION) {
    await db.insert(electionsTable).values({ name, proposal });
  }

  return {
    initiateElectionInDb,
  };
}

export type Repository = ReturnType<typeof createRepository>;
