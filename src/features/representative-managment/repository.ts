import { elections, representative } from "@/drizzle-db/schema";
import { REPRESENTATIVE } from "./types";
import { db } from "@/drizzle-db";

export function createRepository() {
  async function setRepesentativeInDb({
    name,
    email,
    election,
  }: REPRESENTATIVE) {
    await db.insert(representative).values({ name, email, election });
  }

  async function getElectionNamesFromDb() {
    try {
      return await db.select({ name: elections.name }).from(elections);
    } catch (error) {
      console.error("Error fetching elections:", error);
      return [];
    }
  }

  return {
    setRepesentativeInDb,
    getElectionNamesFromDb,
  };
}

export type Repository = ReturnType<typeof createRepository>;
