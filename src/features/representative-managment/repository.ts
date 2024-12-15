import { eq } from "drizzle-orm";
import { REPRESENTATIVE } from "./types";
import { db } from "@/drizzle-db";
import { representative, representativePreferences } from "./schema";

export function createRepository() {
  async function addRepresentativeInDb(
    name: string,
    email: string,
    election_id: number,
    randomProposal_id: number
  ) {
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
        preferred_proposal_id: randomProposal_id,
      });
      return {
        success: true,
        message: "Representative has been created!",
      };
    } catch (error) {
      return {
        success: false,
        message: "An unexpected error occurred. Please try again later.",
        error: error,
      };
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
  async function getReprensentativeById(id: number) {
    return db.select().from(representative).where(eq(representative.id, id));
  }
  async function getRepresentativePreferencesForElection(election_id: number) {
    try {
      return await db
        .select({
          representative_id: representativePreferences.representative_id,
          preferred_proposal_id:
            representativePreferences.preferred_proposal_id,
        })
        .from(representativePreferences)
        .where(eq(representativePreferences.election_id, election_id));
    } catch (error) {
      console.error("Error fetching representative preferences:", error);
      return [];
    }
  }

  return {
    addRepresentativeInDb,
    getRepresentativesByElectionNameFromDb,
    getAllRepresentativesFromDb,
    getReprensentativeById,
    getRepresentativePreferencesForElection,
  };
}

export type Repository = ReturnType<typeof createRepository>;
