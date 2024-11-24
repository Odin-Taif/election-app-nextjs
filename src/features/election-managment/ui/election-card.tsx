import { BiDownvote } from "react-icons/bi";
import { ELECTION } from "../types";
import { Heading, SectionHeading } from "@/ui/components";

type ElectionCardProps = {
  election: ELECTION;
};

export async function ElectionCard({ election }: ElectionCardProps) {
  return (
    <>
      <Heading title={election.name} />
      {election.proposals && election.proposals.length > 0 ? (
        <div className="text-sm text-gray-700 list-disc">
          <SectionHeading title={"Proposals"} icon={<BiDownvote size={30} />} />
          {election.proposals.map((proposal, index) => (
            <div
              key={index}
              className="py-4 mb-2 bg-gray-100 rounded-md shadow-md hover:shadow-lg hover:bg-gray-150 hover:cursor-pointer transition-all duration-300"
            >
              {proposal}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p className="mt-2 text-sm text-gray-500">
            No proposals for this election yet!
          </p>
        </div>
      )}
    </>
  );
}
