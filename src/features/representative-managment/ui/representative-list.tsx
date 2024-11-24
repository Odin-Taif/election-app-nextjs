import { REPRESENTATIVE } from "@/features/representative-managment/types";
import { MdPeopleOutline, MdPerson } from "react-icons/md";
import { SectionHeading } from "@/ui/components";
import { repersentativeFeature } from "@/features/representative-managment";

type Props = {
  election_id: number;
};

export default async function RepresentativesList({ election_id }: Props) {
  const representatives =
    await repersentativeFeature.service.getRepresentativesByElection(
      election_id
    );
  return (
    <div className="py-4 my-10">
      <SectionHeading
        title={"Representatives"}
        icon={<MdPeopleOutline size={30} />}
      />
      {representatives.length === 0 ? (
        <div className="text-center text-red-600 mt-4">
          No representatives available! Nominate some...
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
