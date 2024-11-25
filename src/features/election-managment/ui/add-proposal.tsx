"use client";

import { useActionState } from "react";
import { createProposalAction } from "../actions";
import {
  ErrorMessages,
  findErrors,
  Input,
  SubmitButton,
} from "@/ui/components";

type Props = {
  election_id: number;
};
export function AddProposal({ election_id }: Props) {
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
        <input type="hidden" name="election_id" value={election_id} />
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
