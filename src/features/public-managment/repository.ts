import { public_voters } from "@/drizzle-db/schema";
import { db } from "@/drizzle-db";

export function createRepository() {
  return {};
}

export type Repository = ReturnType<typeof createRepository>;
