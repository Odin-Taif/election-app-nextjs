"use client";

import { useActionState } from "react";
import { createProposalAction } from "../actions";
import { Input, SubmitButton } from "@/ui/components";
import { FormState } from ".";

type Props = {
  election_id: number;
};
export function AddProposal({ election_id }: Props) {
  const [formState, formAction, isLoading] = useActionState(
    createProposalAction,
    null
  );

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
        <strong
          aria-live="polite"
          className="text-red-700 dark:text-red-500 p-5"
        >
          {formState?.errors && formState.errors.proposal}
        </strong>

        {formState && <FormState formState={formState} />}
        <SubmitButton title={"Add Proposal"} loading={isLoading} />
      </form>
    </>
  );
}
