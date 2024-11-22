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
          message: "email is already in use. Please type different email!",
          error: "email is already in use. Please type different email!",
        };
      }
      await db.insert(representative).values({ name, email, election });
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
        .innerJoin(elections, eq(representative.id, elections.id)) // Join with the elections table
        .where(eq(elections.name, electionName)); // Filter by the election name
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
