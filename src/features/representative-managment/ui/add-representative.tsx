"use client";

import { useActionState } from "react";
import { Input, SectionHeading, SubmitButton } from "@/ui/components";
import { createRepresentativeAction } from "../actions";
import { ErrorMessages, findErrors } from "@/ui/components/validation-errors";
import { IoMdPersonAdd } from "react-icons/io";

type Props = {
  election_id: number;
};
export function AddRepresentative({ election_id }: Props) {
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
  return (
    <>
      <SectionHeading
        title={"Nominate Representative for this election"}
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

        <input
          id="election"
          name="election"
          type="text"
          disabled={false}
          defaultValue={election_id}
          hidden
        />
        <ErrorMessages errors={electionErrors} />

        {formState.success && (
          <strong className="text-green-500  m-2">{formState.message}</strong>
        )}
        <SubmitButton title={"Nominate a Representative"} loading={loading} />
      </form>
    </>
  );
}
