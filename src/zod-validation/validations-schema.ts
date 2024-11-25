import { z } from "zod";

const nameSchema = z
  .string()
  .trim()
  .min(3, "Name must be at least 3 characters long")
  .max(40, "Name must be at most 40 characters long");

const emailSchema = z.string().email("Correct email is required");

export const addElectionSchema = z.object({
  name: z.string().min(1, "Election name is required"),
});
export const addProposalSchema = z.object({
  election_id: z.number(),
  proposal: z.string().min(2, "proposal name is required"),
});
export const representativeSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  election_id: z.number(),
});

export const representativeFromSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  election_id: z.number().nullable(),
});

export type ELECTION_VALIDATION_SCHEMA_TYPE = z.infer<typeof addElectionSchema>;
export type REPRESENTIVE_VALIDATION_SCHEMA_TYPE = z.infer<
  typeof representativeSchema
>;
