"use client";

type ElectionFieldValues = {
  name: string;
};
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";
import { createElectionAction } from "../action";
import { Heading, Input, SubmitButton } from "@/ui/components";
import { INITIALSTATE_ELECTION_FORM } from "../types";

const initialState: INITIALSTATE_ELECTION_FORM = {
  success: false,
  message: "",
  errors: { name: "" },
};

export function ElectionForm() {
  const [state, formAction, isPending] = useActionState(
    createElectionAction,
    initialState
  );
  const { register } = useForm<ElectionFieldValues>({
    resolver: zodResolver(validationElectionSchema),
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-gray-100 text-black rounded m-auto p-3 w-full max-w-md sm:p-8  md:max-w-lg  md:p-8 lg:max-w-xl xl:max-w-2xl">
        <div className="flex flex-col gap-2">
          <Heading title="Election Form!" />
          <form action={formAction}>
            <Input
              id="name"
              label="Election Name"
              register={register("name")}
              placeholder={""}
              type={"Enter the elecation name"}
              disabled={false}
            />
            <span aria-live="polite" className="text-red-700 p-5">
              {state?.errors && JSON.stringify(state.errors.name)}
            </span>

            <SubmitButton title={"Create Election"} />
          </form>
        </div>
      </div>
    </div>
  );
}
