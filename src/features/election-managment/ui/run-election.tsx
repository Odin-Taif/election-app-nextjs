"use client";
import { runElectionAction } from "../../public-managment/action";

type Props = {
  election_id: number;
};

export function RunElectionPubli({ election_id }: Props) {
  return (
    <>
      <button
        className="bg-red-400 p-5"
        onClick={() => runElectionAction(election_id)}
      >
        Run Election
      </button>
    </>
  );
}
