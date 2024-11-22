import React from "react";

type Props = {
  title: string;
};

export function Heading({ title }: Props) {
  return (
    <div>
      <div className="text-3xl font-bold">{title}</div>
    </div>
  );
}
