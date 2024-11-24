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
        className="bg-gradient-to-l from-gray-500 to-black hover:from-gray-600 hover:to-black font-bold w-full p-2 text-white shadow-md transition-all duration-300 transform"
      >
        {title}
      </button>
    </div>
  );
}
