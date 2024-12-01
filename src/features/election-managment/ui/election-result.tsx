import { runResultAction } from "../actions";
import { electionFeature } from "../instance";

type Props = {
  election_id: number;
};

export async function ElectionResult({ election_id }: Props) {
  const { preferredProposalId, proposalCount } =
    await electionFeature.service.getResult(election_id);
  console.log(preferredProposalId);
  const propsal = await electionFeature.service.getProposalById(
    preferredProposalId
  );
  return (
    <>
      <div>
        <h2>
          Most Voted Proposal is {propsal.proposal} with {proposalCount} Votes
        </h2>
        {/* <h2>Election Result for Election ID: {election_id}</h2>
        <pre>{JSON.stringify(proposalCount, null, 2)}</pre> */}
      </div>
    </>
  );
}
