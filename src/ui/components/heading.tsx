import React from "react";

type Props = {
  title: string;
};

export function Heading({ title }: Props) {
  return (
    <div>
      <h2 className="text-3xl font-bold text-black">{title}</h2>
    </div>
  );
}
