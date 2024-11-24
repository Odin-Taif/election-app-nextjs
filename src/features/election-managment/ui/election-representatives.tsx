import Link from "next/link";
import { REPRESENTATIVE } from "@/features/representative-managment/types";
import { MdPeopleOutline, MdPerson } from "react-icons/md";
import { SectionHeading } from "@/ui/components";

type Props = {
  representatives: REPRESENTATIVE[];
};

export async function ElectionRepresentatives({ representatives }: Props) {
  return (
    <div className="py-4 my-10">
      <SectionHeading
        title={"Representatives list"}
        icon={<MdPeopleOutline size={30} />}
      />
      {representatives.length === 0 ? (
        <div className="text-center text-red-600 mt-4">
          No representatives available.
          <div className="mt-10">
            <Link href={"/nominate-representative"}>
              <button className="w-full bg-gradient-to-r from-gray-500 to-black hover:from-gray-600 hover:to-black text-white font-bold py-2 px-4 rounded shadow-md transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-gray-300">
                Add some representatives for the election
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap">
          {representatives.map((person, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-2">
              <div className="bg-white flex justify-center items-start text-center shadow-md rounded-lg p-4 border border-gray-200">
                <MdPerson size={30} />
                {person.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
