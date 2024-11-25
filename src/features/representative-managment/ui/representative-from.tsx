"use client";

import { Controller, useForm } from "react-hook-form";
import { useActionState } from "react";
import { Input, SectionHeading, SubmitButton } from "@/ui/components";
import { RepresentativeFormAction } from "../action";
import { SelectElection } from ".";
import { ErrorMessages, findErrors } from "@/ui/components/validation-errors";
import { IoMdPersonAdd } from "react-icons/io";

export type Props = {
  elections: {
    name: string;
    id: number;
  }[];
};

export function RepresentativeForm({ elections }: Props) {
  const [formState, formAction, loading] = useActionState(
    RepresentativeFormAction,
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
    <>
      <div className="flex flex-col items-center justify-center mb-5 bg-gray-200 p-4">
        <div className="bg-gray-100 text-black rounded p-5 w-full max-w-md sm:p-8 md:max-w-lg lg:max-w-xl xl:max-w-2xl shadow-lg">
          <SectionHeading
            title={"Add Representative"}
            icon={<IoMdPersonAdd size={30} />}
          />

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
              rules={{ required: false }}
              render={({ field: { value, onChange } }) => (
                <SelectElection
                  options={elections}
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
    </>
  );
}
