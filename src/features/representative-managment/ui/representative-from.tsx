"use client";

import { Controller, useForm } from "react-hook-form";
import { useActionState } from "react";
import { Heading, Input, SubmitButton } from "@/ui/components";
import { createRepresentativeAction } from "../action";
import { SelectElection } from ".";
import { ErrorMessages, findErrors } from "@/zod-validation/validation-errors";

export type Props = {
  elections: { name: string }[];
};

export function RepresentativeForm({ elections }: Props) {
  const [formState, formAction] = useActionState(createRepresentativeAction, {
    errors: [],
  });
  const nameErrors = findErrors("name", formState?.errors ?? []);
  const electionErrors = findErrors("election", formState?.errors ?? []);

  const { control } = useForm();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-gray-100 text-black rounded m-auto p-3 w-full max-w-md sm:p-8  md:max-w-lg  md:p-8 lg:max-w-xl xl:max-w-2xl">
        <div className="flex flex-col gap-2">
          <Heading title="Representive Form!" />
          <form action={formAction}>
            <Input
              id="name"
              label="Representive Name"
              name="name"
              type={"name"}
              disabled={false}
            />
            <ErrorMessages errors={nameErrors} />
            <Controller
              name="election"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <SelectElection
                  options={elections}
                  label="Select election"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <ErrorMessages errors={electionErrors} />
            <SubmitButton title={"Nominate Representive"} />
          </form>
        </div>
      </div>
    </div>
  );
}
