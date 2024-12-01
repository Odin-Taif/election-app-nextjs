"use client";

import { useActionState } from "react";
import { createElectionAction } from "../actions";
import { Input, SubmitButton } from "@/ui/components";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export function AddElection() {
  const [formState, formAction, loading] = useActionState(
    createElectionAction,
    null
  );
  return (
    <div className="flex flex-col items-center justify-center mb-5  p-4">
      <div className="bg-gray-100 text-white rounded m-auto p-3 w-full max-w-md sm:p-8  md:max-w-lg  md:p-8 lg:max-w-xl xl:max-w-2xl">
        <div className="flex flex-col gap-2">
          <form action={formAction}>
            <Input
              id="name"
              name="name"
              type="text"
              disabled={false}
              label={"Set up an election"}
            />
            <strong
              aria-live="polite"
              className="text-red-700 dark:text-red-500 p-5"
            >
              {formState?.errors && formState.errors.name}
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
            <SubmitButton title={"Create Election"} loading={loading} />
          </form>
        </div>
      </div>
    </div>
  );
}
