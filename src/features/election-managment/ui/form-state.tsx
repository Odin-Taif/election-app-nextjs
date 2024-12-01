"use client";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  success: boolean;
  message: string;
};

export function FormHandler({ success, message }: Props) {
  return (
    <div
      className={`mt-4 flex items-center space-x-2 rounded-md p-3 text-sm ${
        success
          ? "bg-green-50 text-green-600 dark:bg-green-900 dark:text-green-400"
          : "bg-red-50 text-red-600 dark:bg-red-900 dark:text-red-400"
      }`}
      aria-live="polite"
      aria-atomic="true"
    >
      <ExclamationCircleIcon
        className={`h-5 w-5 ${
          success
            ? "text-green-500 dark:text-green-400"
            : "text-red-500 dark:text-red-400"
        }`}
      />
      <strong>{message}</strong>
    </div>
  );
}
