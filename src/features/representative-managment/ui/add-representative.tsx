"use client";

import { useActionState } from "react";
import { Input, SectionHeading, SubmitButton } from "@/ui/components";
import { createRepresentativeAction } from "../actions";
import { IoMdPersonAdd } from "react-icons/io";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  election_id: number;
};
export function AddRepresentative({ election_id }: Props) {
  const [formState, formAction, loading] = useActionState(
    createRepresentativeAction,
    null
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
        <strong
          aria-live="polite"
          className="text-red-700 dark:text-red-500 p-5"
        >
          {formState?.errors && formState.errors.name}
        </strong>
        <Input
          id="email"
          label="Representative Email"
          name="email"
          type={"email"}
          disabled={false}
        />
        <strong
          aria-live="polite"
          className="text-red-700 dark:text-red-500 p-5"
        >
          {formState?.errors && formState.errors.email}
        </strong>
        <input
          id="election"
          name="election"
          type="text"
          disabled={false}
          defaultValue={election_id}
          hidden
        />
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
        <SubmitButton title={"Nominate a Representative"} loading={loading} />
      </form>
    </>
  );
}
