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
        className="bg-gray-700 hover:bg-black rounded-md font-bold w-full p-2 text-white shadow-md"
      >
        {title}
      </button>
    </div>
  );
}
