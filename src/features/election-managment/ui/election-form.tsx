"use client";

import { useActionState } from "react";
import { createElectionAction } from "../action";
import {
  ErrorMessages,
  findErrors,
  Heading,
  Input,
  SubmitButton,
} from "@/ui/components";

export function ElectionForm() {
  const [formState, formAction, loading] = useActionState(
    createElectionAction,
    {
      errors: [],
    }
  );
  const nameErrors = findErrors("name", formState?.errors ?? []);
  return (
    <div className="flex flex-col items-center justify-center mb-5 bg-gray-200 p-4">
      <Heading title="Election Form!" />
      <div className="bg-gray-100 text-black rounded m-auto p-3 w-full max-w-md sm:p-8  md:max-w-lg  md:p-8 lg:max-w-xl xl:max-w-2xl">
        <div className="flex flex-col gap-2">
          <form action={formAction}>
            <Input
              id="name"
              name="name"
              type="text"
              disabled={false}
              label={"Set up an election"}
            />
            <ErrorMessages errors={nameErrors} />
            <SubmitButton title={"Create Election"} loading={loading} />
          </form>
        </div>
      </div>
    </div>
  );
}
