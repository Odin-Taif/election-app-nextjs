"use client";
import React from "react";

type Props = {
  id: string;
  name: string;
  label: string;
  type: string;
  disabled: boolean;
};

export function Input({ id, name, label, type, disabled }: Props) {
  return (
    <div className="w-full relative my-2">
      <input
        id={id}
        name={name}
        disabled={disabled}
        type={type}
        className={`peer relative z-10 w-full p-4 pl-4 font-light bg-transparent border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed `}
      />

      <label
        className={`absolute text-sm duration-150 transform -translate-y-4 top-5 left-4 z-9 origin-[0] peer-placeholder-shown:scale-75 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 `}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}
