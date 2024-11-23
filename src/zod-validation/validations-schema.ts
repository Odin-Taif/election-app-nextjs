import { z } from "zod";

const nameSchema = z
  .string()
  .min(3, "Name must be at least 3 characters long")
  .max(40, "Name must be at most 40 characters long");

const eleactionNameSchema = z
  .string()
  .min(3, "Name must be at least 3 characters long")
  .max(40, "Name must be at most 40 characters long");

const SchemaProposal = z
  .string()
  .min(3, "Name must be at least 3 characters long")
  .max(40, "Name must be at most 40 characters long");

export const electionSchema = z.object({
  name: nameSchema,
  proposal: SchemaProposal,
});

export const representativeSchema = z.object({
  name: nameSchema,
  election: eleactionNameSchema,
});

export type ELECTION_VALIDATION_SCHEMA_TYPE = z.infer<typeof electionSchema>;
export type REPRESENTIVE_VALIDATION_SCHEMA_TYPE = z.infer<
  typeof representativeSchema
>;
