"use client";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

interface FormStateProps {
  formState: {
    success: boolean;
    message: string;
  };
}

export function FormState({ formState }: FormStateProps) {
  return (
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
  );
}
