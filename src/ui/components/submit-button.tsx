"use client";
import { useFormStatus } from "react-dom";

type Props = {
  title: string;
};
export function SubmitButton({ title }: Props) {
  const { pending } = useFormStatus();

  return (
    <div>
      <button
        disabled={pending}
        type="submit"
        className="btn btn-accent bg-slate-400 w-full p-2"
      >
        {title}
      </button>
    </div>
  );
}
