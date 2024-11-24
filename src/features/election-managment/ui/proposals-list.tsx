import { BiDownvote } from "react-icons/bi";
import { SectionHeading } from "@/ui/components";
import { electionFeatureInstance } from "../feature";

type ProposalsListProps = {
  election_id: number;
};

export async function ProposalsList({ election_id }: ProposalsListProps) {
  const proposals =
    await electionFeatureInstance.service.getProposalsForElection(election_id);

  return (
    <>
      {proposals && proposals.length > 0 ? (
        <div className="text-sm text-gray-700 list-disc">
          <SectionHeading title={"Proposals"} icon={<BiDownvote size={30} />} />
          {proposals.map((proposal, index) => (
            <div
              key={index}
              className="py-4 mb-2 bg-gray-100 rounded-md shadow-md hover:shadow-lg hover:bg-gray-150 hover:cursor-pointer transition-all duration-300"
            >
              {proposal.proposal}
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
