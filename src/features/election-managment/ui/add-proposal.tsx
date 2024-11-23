"use client";

import { useActionState } from "react";
import { createProposalAction } from "../action";
import {
  ErrorMessages,
  findErrors,
  Heading,
  Input,
  SubmitButton,
} from "@/ui/components";

export function ProposalForm() {
  const [formState, formAction, isLoading] = useActionState(
    createProposalAction,
    {
      errors: [],
    }
  );

  const proposalErrors = findErrors("proposal", formState?.errors ?? []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-gray-100 text-black rounded m-auto p-3 w-full max-w-md sm:p-8  md:max-w-lg  md:p-8 lg:max-w-xl xl:max-w-2xl">
        <div className="flex flex-col gap-2">
          <Heading title="Proposal Form!" />
          <form action={formAction}>
            <Input
              id="proposal"
              name="proposal"
              type="text"
              disabled={false}
              label={"Add a proposal for the Proposal"}
            />
            <ErrorMessages errors={proposalErrors} />
            <SubmitButton title={"Create Proposal"} loading={isLoading} />
          </form>
        </div>
      </div>
    </div>
  );
}
