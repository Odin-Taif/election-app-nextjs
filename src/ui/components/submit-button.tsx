"use client";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <div>
      <button
        disabled={pending}
        type="submit"
        className="btn btn-accent bg-slate-400 w-full p-2"
      >
        Sign Up
      </button>
    </div>
  );
}
