"use client";

import { useActionState } from "react";
import { createElectionAction } from "../action";
import { Heading, Input, SubmitButton } from "@/ui/components";
import { ErrorMessages, findErrors } from "@/zod-validation/validation-errors";

export function ElectionForm() {
  const [formState, formAction] = useActionState(createElectionAction, {
    errors: [],
  });
  const nameErrors = findErrors("name", formState?.errors ?? []);
  const proposalErrors = findErrors("proposal", formState?.errors ?? []);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-gray-100 text-black rounded m-auto p-3 w-full max-w-md sm:p-8  md:max-w-lg  md:p-8 lg:max-w-xl xl:max-w-2xl">
        <div className="flex flex-col gap-2">
          <Heading title="Election Form!" />
          <form action={formAction}>
            <Input
              id="name"
              name="name"
              label="Election Name"
              type={"text"}
              disabled={false}
            />
            <ErrorMessages errors={nameErrors} />
            <Input
              id="proposal"
              name="proposal"
              label="Add Proposal for the election."
              type={"text"}
              disabled={false}
            />
            <ErrorMessages errors={proposalErrors} />
            <SubmitButton title={"Create Election"} />
          </form>
        </div>
      </div>
    </div>
  );
}
