"use client";
import { useFormStatus } from "react-dom";

type Props = {
  title: string;
};
export function SubmitButton({ title }: Props) {
  const { pending } = useFormStatus();

  return (
    <div className="bg-slate-400">
      <button
        disabled={pending}
        type="submit"
        className="bg-slate-500 w-full p-2"
      >
        {title}
      </button>
    </div>
  );
}
