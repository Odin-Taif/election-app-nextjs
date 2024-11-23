import { elections, repesentative } from "@/drizzle-db/schema";
import { REPRESENTATIVE } from "./types";
import { db } from "@/drizzle-db";

export function createRepository() {
  return {
    async setRepesentativeInDb({ name, election }: REPRESENTATIVE) {
      await db.insert(repesentative).values({ name, election });
    },
    async getElectionNamesFromDb() {
      try {
        return await db.select({ name: elections.name }).from(elections);
      } catch (error) {
        console.error("Error fetching elections:", error);
        return [];
      }
    },
  };
}

export type Repository = ReturnType<typeof createRepository>;
