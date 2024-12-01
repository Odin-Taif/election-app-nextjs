"use client";

import { useActionState } from "react";
import { createProposalAction } from "../actions";
import { Input, SubmitButton } from "@/ui/components";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

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
        {formState && (
          <div
            className={`mt-4 flex items-center space-x-2 rounded-md p-3 text-sm ${
              formState.success
                ? "bg-green-50 text-green-600 dark:bg-green-900 dark:text-green-400"
                : "bg-red-50 text-red-600 dark:bg-red-900 dark:text-red-400"
            }`}
            aria-live="polite"
            aria-atomic="true"
          >
            <ExclamationCircleIcon
              className={`h-5 w-5 ${
                formState.success
                  ? "text-green-500 dark:text-green-400"
                  : "text-red-500 dark:text-red-400"
              }`}
            />
            <strong>{formState.message}</strong>
          </div>
        )}
        <SubmitButton title={"Add Proposal"} loading={isLoading} />
      </form>
    </>
  );
}
