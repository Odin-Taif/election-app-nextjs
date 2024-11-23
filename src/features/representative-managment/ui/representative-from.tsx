"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState } from "react";
import { Heading, Input, SubmitButton } from "@/ui/components";
import {
  representativeSchema,
  REPRESENTIVE_VALIDATION_SCHEMA_TYPE,
} from "@/zod-validation/validations-schema";
import { ELECTION_SELECTION, INITIALSTATE_REPRESENTATIVE_FORM } from "../types";
import { createRepresentativeAction } from "../action";
import { SelectElection } from ".";

const initialState: INITIALSTATE_REPRESENTATIVE_FORM = {
  success: false,
  message: "",
  errors: { name: "" },
};

export type Props = {
  elections: ELECTION_SELECTION[];
};

export function RepresentativeForm({ elections }: Props) {
  console.log(elections);
  const [state, formAction] = useActionState(
    createRepresentativeAction,
    initialState
  );
  const {
    register,
    control,
    formState: { errors },
  } = useForm<REPRESENTIVE_VALIDATION_SCHEMA_TYPE>({
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

            <Controller
              name="election"
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange } }) => (
                <SelectElection
                  options={elections}
                  label="Select election"
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            {errors.election?.message && (
              <strong className="text-error px-2 form__error-message">
                Bootcamp option is {errors.election.message.toString()}
              </strong>
            )}

            <SubmitButton title={"Nominate Representive"} />
          </form>
        </div>
      </div>
    </div>
  );
}
