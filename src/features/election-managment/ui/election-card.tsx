import { MdHowToVote } from "react-icons/md";
import { BiDownvote } from "react-icons/bi";
import { ELECTION } from "../types";

type ElectionCardProps = {
  election: ELECTION;
};

export async function ElectionCard({ election }: ElectionCardProps) {
  return (
    <>
      <div className="my-2 flex flex-row text-left items-left border-b border-b-gray-200">
        <MdHowToVote size={30} color="green" />
        <h5 className="text-lg mx-2 font-semibold text-gray-800">
          {election.name}
        </h5>
      </div>
      {election.proposals && election.proposals.length > 0 ? (
        <div className="text-sm text-gray-700 list-disc">
          <div className="my-2 flex flex-row text-left items-center justify-center">
            <h5 className="text-sm mx-2 font-semibold text-gray-800">
              Election&apos;s Proposals
            </h5>
            <BiDownvote size={30} />
          </div>

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
