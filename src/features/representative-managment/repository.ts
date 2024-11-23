import { repesentativeTable } from "@/drizzle-db/schema";
import { REPRESENTATIVE } from "./types";
import { db } from "@/drizzle-db";

export function createRepository() {
  async function setRepesentativeInDb({ name }: REPRESENTATIVE) {
    await db.insert(repesentativeTable).values({ name });
  }

  return {
    setRepesentativeInDb,
  };
}

export type Repository = ReturnType<typeof createRepository>;
