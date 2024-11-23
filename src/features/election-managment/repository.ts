import { elections } from "@/drizzle-db/schema";
import { ELECTION } from "./types";
import { db } from "@/drizzle-db";

export function createRepository() {
  async function initiateElectionInDb({ name, proposal }: ELECTION) {
    const proposals = ["Proposal 1", "Proposal 2", "Proposal 3"];
    await db.insert(elections).values({ name, proposals });
  }

  return {
    initiateElectionInDb,
  };
}

export type Repository = ReturnType<typeof createRepository>;
