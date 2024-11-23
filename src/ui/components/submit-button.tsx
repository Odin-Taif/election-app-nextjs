"use client";

type Props = {
  title: string;
  loading: boolean;
};
export function SubmitButton({ title, loading }: Props) {
  return (
    <div className="bg-slate-400">
      <button
        disabled={loading}
        type="submit"
        className="bg-slate-500 w-full p-2"
      >
        {title}
      </button>
    </div>
  );
}
