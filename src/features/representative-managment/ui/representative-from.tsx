"use client";

import { Controller, useForm } from "react-hook-form";
import { useActionState } from "react";
import { Heading, Input, SubmitButton } from "@/ui/components";
import { createRepresentativeAction } from "../action";
import { SelectElection } from ".";
import { ErrorMessages, findErrors } from "@/ui/components/validation-errors";

export type Props = {
  electionNames: { name: string }[];
};

export function RepresentativeForm({ electionNames }: Props) {
  const [formState, formAction, loading] = useActionState(
    createRepresentativeAction,
    {
      success: true,
      errors: [],
      message: "",
    }
  );

  const nameErrors = findErrors(
    "name",
    Array.isArray(formState?.errors) ? formState.errors : []
  );
  const emailErrors = findErrors(
    "email",
    Array.isArray(formState?.errors) ? formState.errors : []
  );
  const electionErrors = findErrors(
    "election",
    Array.isArray(formState?.errors) ? formState.errors : []
  );

  const { control } = useForm();

  return (
    <div className="flex flex-col items-center justify-center mb-5 bg-gray-200 p-4">
      <Heading title="Add Representative" />
      <div className="bg-gray-100 text-black rounded m-auto p-3 w-full max-w-md sm:p-8  md:max-w-lg  md:p-8 lg:max-w-xl xl:max-w-2xl">
        <div className="flex flex-col gap-2">
          <form action={formAction}>
            <Input
              id="name"
              label="Representative Name"
              name="name"
              type={"name"}
              disabled={false}
            />
            <ErrorMessages errors={nameErrors} />
            <Input
              id="email"
              label="Representative Email"
              name="email"
              type={"email"}
              disabled={false}
            />
            <ErrorMessages errors={emailErrors} />
            <Controller
              name="election"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <SelectElection
                  options={electionNames}
                  label="Select an election"
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <ErrorMessages errors={electionErrors} />
            {formState.success ? (
              <strong className="text-green-500  m-2">
                {formState.message}
              </strong>
            ) : (
              <strong className="text-red-500  m-2">{formState.message}</strong>
            )}
            <SubmitButton
              title={"Nominate a Representative"}
              loading={loading}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
