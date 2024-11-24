import { Heading } from "@/ui/components";
import { ELECTION } from "../types";
import { ProposalForm } from "./add-proposal";
import Link from "next/link";
import { MdHowToVote } from "react-icons/md";
import { BiDownvote } from "react-icons/bi";

type Props = {
  elections: ELECTION[];
};

export async function ElectionsList({ elections }: Props) {
  return (
    <div className="flex flex-col items-center justify-center mb-5 bg-gray-200 p-4">
      <Heading title="Elections List" />
      <div className="bg-gray-100 text-black rounded p-5 w-full max-w-md sm:p-8 md:max-w-lg lg:max-w-xl xl:max-w-2xl shadow-lg">
        {elections.length === 0 ? (
          <div className="text-center text-red-600 mt-4">
            No elections available.
            <div className="mt-10">
              <Link href={"/"}>
                <button className="w-full bg-gradient-to-r from-gray-500 to-black hover:from-gray-600 hover:to-black text-white font-bold py-2 px-4 rounded shadow-md transition-all duration-300 transform hover:scale-105 focus:ring-4 focus:ring-gray-300">
                  Run some elections up
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full">
            {elections.map((election) => (
              <div
                key={election.id}
                className="bg-white text-center shadow-md rounded-lg p-4 m-2 border border-gray-200"
              >
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
                <ProposalForm electionId={election.id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
