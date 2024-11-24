import { Heading } from "@/ui/components";
import { ELECTION } from "../types";
export type Props = {
  elections: ELECTION[];
};
export async function ElectionsList({ elections }: Props) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <div className="bg-gray-100 text-black rounded m-auto p-3 w-full max-w-md sm:p-8  md:max-w-lg  md:p-8 lg:max-w-xl xl:max-w-2xl">
        <div className="flex flex-col gap-2">
          <Heading title="Representive Form!" />
        </div>
      </div>
    </div>
  );
}
