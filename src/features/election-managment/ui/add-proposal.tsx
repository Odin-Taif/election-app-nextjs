"use client";

import { useActionState } from "react";
import { createProposalAction } from "../action";
import {
  ErrorMessages,
  findErrors,
  Input,
  SubmitButton,
} from "@/ui/components";

type Props = {
  electionId: number;
};
export function ProposalForm({ electionId }: Props) {
  const [formState, formAction, isLoading] = useActionState(
    createProposalAction,
    {
      errors: [],
    }
  );

  const proposalErrors = findErrors("proposal", formState?.errors ?? []);
  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="electionId" value={electionId} />
        <Input
          id="proposal"
          name="proposal"
          type="text"
          disabled={false}
          label={"Add a proposal for the election"}
        />
        <ErrorMessages errors={proposalErrors} />
        <SubmitButton title={"Add Proposal"} loading={isLoading} />
      </form>
    </>
  );
}
