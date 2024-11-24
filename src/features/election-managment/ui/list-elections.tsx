import { Heading } from "@/ui/components";
import { ELECTION } from "../types";
import { ProposalForm } from "./add-proposal";

type Props = {
  elections: ELECTION[];
};

export async function ElectionsList({ elections }: Props) {
  return (
    <div className="flex flex-col items-center justify-center mb-5 bg-gray-200 p-4">
      <Heading title="Elections List" />
      <div className="bg-gray-100 text-black rounded m-auto p-3 w-full max-w-md sm:p-8  md:max-w-lg  md:p-8 lg:max-w-xl xl:max-w-2xl">
        {elections.length === 0 ? (
          <p className="text-center text-gray-600 mt-4">
            No elections available.
          </p>
        ) : (
          <div className="w-full">
            {elections.map((election) => (
              <div
                key={election.id}
                className="bg-white w-full text-center justify-center shadow-md rounded-lg p-4 m-2 border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {election.name}
                </h3>

                {election.proposals && election.proposals.length > 0 ? (
                  <div className="text-sm text-gray-700 list-disc">
                    {election.proposals.map((proposal, index) => (
                      <div
                        key={index}
                        className="py-4 mb-2 bg-white rounded-md shadow-md hover:shadow-lg hover:bg-gray-50 hover:cursor-pointer transition-all duration-300"
                      >
                        {proposal}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-gray-500">
                    No proposals for this election yet!
                  </p>
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
