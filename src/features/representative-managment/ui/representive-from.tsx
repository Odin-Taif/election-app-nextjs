"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";
import { Heading, Input, SubmitButton } from "@/ui/components";
import { representativeSchema } from "@/zod-validation/validations-schema";
import {
  INITIALSTATE_REPRESENTATIVE_FORM,
  REPRESENTATIVE_FORM_FIELDS,
} from "../types";
import { createRepresentativeAction } from "../action";

const initialState: INITIALSTATE_REPRESENTATIVE_FORM = {
  success: false,
  message: "",
  errors: { name: "" },
};

export function RepresentativeForm() {
  const [state, formAction, isPending] = useActionState(
    createRepresentativeAction,
    initialState
  );
  const { register } = useForm<REPRESENTATIVE_FORM_FIELDS>({
    resolver: zodResolver(representativeSchema),
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-gray-100 text-black rounded m-auto p-3 w-full max-w-md sm:p-8  md:max-w-lg  md:p-8 lg:max-w-xl xl:max-w-2xl">
        <div className="flex flex-col gap-2">
          <Heading title="Representive Form!" />
          <form action={formAction}>
            <Input
              id="name"
              label="Representive Name"
              register={register("name")}
              type={"name"}
              disabled={false}
            />
            <span aria-live="polite" className="text-red-700 p-5">
              {state?.errors && JSON.stringify(state.errors.name)}
            </span>
            <SubmitButton title={"Nominate Representive"} />
          </form>
        </div>
      </div>
    </div>
  );
}
