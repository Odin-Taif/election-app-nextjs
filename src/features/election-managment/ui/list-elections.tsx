import { Heading } from "@/ui/components";
import { ELECTION } from "../types";
import { ProposalForm } from "./add-proposal";

type Props = {
  elections: ELECTION[];
};

export async function ElectionsList({ elections }: Props) {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full text-black max-w-4xl p-4">
        <Heading title="Elections List" />
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
                  <div className="mt-2 text-sm text-gray-700 list-disc pl-5">
                    {election.proposals.map((proposal, index) => (
                      <div key={index}>{proposal}</div>
                    ))}
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-gray-500">
                    No proposals available.
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
