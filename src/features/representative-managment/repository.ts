import { elections, representative } from "@/drizzle-db/schema";
import { eq } from "drizzle-orm";
import { REPRESENTATIVE } from "./types";
import { db } from "@/drizzle-db";

export function createRepository() {
  async function setRepresentativeInDb({
    name,
    email,
    election_id,
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
        election_id: election_id ?? null,
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
  // ask marcus if that is okey to fetch election from here | not to decouple
  async function getElectionsFromDb() {
    try {
      return await db
        .select({ name: elections.name, id: elections.id })
        .from(elections);
    } catch (error) {
      console.error("Error fetching elections:", error);
      return [];
    }
  }

  async function getRepresentativesByElectionNameFromDb(election_id: number) {
    try {
      return await db
        .select()
        .from(representative)
        .where(eq(representative.election_id, election_id));
    } catch (error) {
      console.error("Error fetching representative:", error);
      return [];
    }
  }

  async function getAllRepresentativesFromDb() {
    try {
      return await db.select().from(representative);
    } catch (error) {
      console.error("Error fetching representative:", error);
      return [];
    }
  }

  return {
    setRepresentativeInDb,
    getElectionsFromDb,
    getRepresentativesByElectionNameFromDb,
    getAllRepresentativesFromDb,
  };
}

export type Repository = ReturnType<typeof createRepository>;
