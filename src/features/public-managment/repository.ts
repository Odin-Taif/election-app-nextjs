import { publicVoters } from "@/drizzle-db/schema";
import { db } from "@/drizzle-db";
import { PUBLIC_VOTER } from "./types";

export function createRepository() {
  async function seedVoterInDb({ id, name }: PUBLIC_VOTER) {
    await db.insert(publicVoters).values({ id, name });
  }
  return {
    seedVoterInDb,
  };
}

export type Repository = ReturnType<typeof createRepository>;
