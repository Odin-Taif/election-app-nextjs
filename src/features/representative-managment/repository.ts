import { eq } from "drizzle-orm";
import { REPRESENTATIVE } from "./types";
import { db } from "@/drizzle-db";
import { representative } from "./schema";

export function createRepository() {
  async function addRepresentativeInDb({
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

  // async function getElectionWinners() {
  //   try {
  //     const results = await db
  //       .select({
  //         election_id: elections.id,
  //         representative_id: representative.id,
  //         representative_name: representative.name,
  //         total_votes: sql`COUNT(votes.id)`.as("total_votes"),
  //       })
  //       .from(votes)
  //       .innerJoin(
  //         electionProposals,
  //         eq(electionProposals.id, votes.election_proposal_id)
  //       )
  //       .innerJoin(elections, eq(elections.id, electionProposals.election_id))
  //       .innerJoin(
  //         representative,
  //         eq(representative.id, votes.representative_id)
  //       )
  //       .groupBy(elections.id, representative.id, representative.name)
  //       .orderBy(desc(sql`total_votes`))
  //       .limit(1);

  //     const winners = results.map((result) => ({
  //       election_id: result.election_id,
  //       representative_name: result.representative_name,
  //       total_votes: result.total_votes,
  //     }));

  //     return winners;
  //   } catch (error) {
  //     console.error("Error fetching election winners:", error);
  //     return [];
  //   }
  // }

  return {
    addRepresentativeInDb,
    getRepresentativesByElectionNameFromDb,
    getAllRepresentativesFromDb,
    // getElectionWinners,
  };
}

export type Repository = ReturnType<typeof createRepository>;
