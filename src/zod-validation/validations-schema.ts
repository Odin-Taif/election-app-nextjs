import { z } from "zod";

const nameSchema = z
  .string()
  .trim()
  .min(3, "Name must be at least 3 characters long")
  .max(40, "Name must be at most 40 characters long");

const emailSchema = z.string().email("Correct email is required");

const electionNameSchema = z
  .string()
  .refine((value) => value.trim().length > 0, {
    message: "You must select an election option",
  });
const SchemaProposal = z
  .string()
  .min(3, "Name must be at least 3 characters long")
  .max(40, "Name must be at most 40 characters long");

export const addElectionSchema = z.object({
  name: nameSchema,
});
export const addProposalSchema = z.object({
  electionId: z.string(),
  proposal: SchemaProposal,
});
export const representativeSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  election: electionNameSchema,
});

export type ELECTION_VALIDATION_SCHEMA_TYPE = z.infer<typeof addElectionSchema>;
export type REPRESENTIVE_VALIDATION_SCHEMA_TYPE = z.infer<
  typeof representativeSchema
>;
