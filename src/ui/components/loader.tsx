"use client";

export function Loader() {
  return (
    <div className="rounded relative bg-white py-12">
      <div className="rounded-full bg-amber-100 w-[177px] h-[177px] relative flex justify-center items-center mx-auto animate-spin">
        <svg
          className="absolute top-0 left-0"
          width={177}
          height={177}
          viewBox="0 0 177 177"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            fill="#0fb8ad"
          ></path>
        </svg>

        <div className="rounded-full bg-white w-[100px] h-[150px]" />
      </div>

      <p className="mt-6 font-medium text-gray-800 text-center animate-bounce text-xl">
        Loading ...
      </p>
    </div>
  );
}
