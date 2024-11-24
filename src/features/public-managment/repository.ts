import { publicVoters } from "@/drizzle-db/schema";
import { db } from "@/drizzle-db";
import { PublicVoter } from "./types";

export function createRepository() {
  async function seedVoterInDb({ id, name }: PublicVoter) {
    await db.insert(publicVoters).values({ id, name, createdAt: new Date() });
  }
  return {
    seedVoterInDb,
  };
}

export type Repository = ReturnType<typeof createRepository>;
