import { elections, representative } from "@/drizzle-db/schema";
import { eq } from "drizzle-orm";
import { REPRESENTATIVE } from "./types";
import { db } from "@/drizzle-db";

export function createRepository() {
  async function setRepresentativeInDb({
    name,
    email,
    election,
  }: REPRESENTATIVE) {
    try {
      const existingRepresentative = await db
        .select()
        .from(representative)
        .where(eq(representative.email, email));

      if (existingRepresentative.length > 0) {
        return {
          success: false,
          message: "Email is already in use. Please provide a different email.",
          error: "Email is already in use. Please provide a different email.",
        };
      }

      await db.insert(representative).values({
        name,
        email,
        election_id: election ?? null,
      });

      return {
        success: true,
        message: "Representative added successfully!",
        error: "",
      };
    } catch (error) {
      return {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
        error: error,
      };
    }
  }

  async function getElectionNamesFromDb() {
    try {
      return await db.select({ name: elections.name }).from(elections);
    } catch (error) {
      console.error("Error fetching elections:", error);
      return [];
    }
  }

  async function getRepresentativesByElectionNameFromDb(electionName: string) {
    try {
      return await db
        .select()
        .from(representative)
        .innerJoin(elections, eq(representative.id, elections.id))
        .where(eq(elections.name, electionName));
    } catch (error) {
      console.error("Error fetching representative:", error);
      return [];
    }
  }
  return {
    setRepresentativeInDb,
    getElectionNamesFromDb,
    getRepresentativesByElectionNameFromDb,
  };
}

export type Repository = ReturnType<typeof createRepository>;
