import { elections } from "@/drizzle-db/schema";
import { INITIAT_EELECTION } from "./types";
import { db } from "@/drizzle-db";

export function createRepository() {
  async function initiateElectionInDb({ name }: INITIAT_EELECTION) {
    await db.insert(elections).values({ name });
  }

  async function getElectionsFromDb() {
    try {
      return await db.select().from(elections);
    } catch (error) {
      console.error("Error fetching elections:", error);
      return [];
    }
  }

  return {
    initiateElectionInDb,
    getElectionsFromDb,
  };
}

export type Repository = ReturnType<typeof createRepository>;
