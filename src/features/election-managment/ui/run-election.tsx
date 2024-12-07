"use client";

import { SubmitButton } from "@/ui/components";
import { useActionState } from "react";
import { runElectionAction } from "../actions";

type Props = {
  election_id: number;
};

export function RunElectionPubli({ election_id }: Props) {
  const [formState, formAction, isLoading] = useActionState(
    runElectionAction,
    null
  );
  console.log(formState);
  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="election_id" value={election_id} />
        <SubmitButton title={"Run Election"} loading={isLoading} />
      </form>
    </>
  );
}
