"use client";

type Props = {
  title: string;
  loading: boolean;
};
export function SubmitButton({ title, loading }: Props) {
  return (
    <div className="my-4">
      <button
        disabled={loading}
        type="submit"
        className={`rounded-md font-bold w-full p-2 text-white shadow-md ${
          loading
            ? "bg-gray-700 cursor-not-allowed"
            : "bg-gray-700 hover:bg-black"
        }`}
      >
        {title}
      </button>
    </div>
  );
}
