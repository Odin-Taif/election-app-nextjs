import { Heading } from "@/ui/components";
import { ELECTION } from "../types";
import Link from "next/link";
import { ElectionCard, ProposalForm, ElectionRepresentatives } from ".";
import { REPRESENTATIVE } from "@/features/representative-managment/types";

type Props = {
  elections: ELECTION[];
};

const representatives: REPRESENTATIVE[] = [
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    election: "2024 Presidential Election",
  },
  {
    name: "Bob Smith",
    email: "bob.smith@example.com",
    election: "2024 Congressional Election",
  },
  {
    name: "Catherine Lee",
    email: "catherine.lee@example.com",
    election: "2024 Senate Election",
  },
  {
    name: "David Brown",
    email: "david.brown@example.com",
    election: "2024 Mayoral Election",
  },
  {
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    election: "2024 Gubernatorial Election",
  },
];

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
            {elections.map((election, index) => (
              <div
                key={index}
                className="bg-white text-center shadow-md rounded-lg p-4 m-2 border border-gray-200"
              >
                <ElectionCard election={election} />
                <ProposalForm electionId={election.id} />
                <ElectionRepresentatives representatives={representatives} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
