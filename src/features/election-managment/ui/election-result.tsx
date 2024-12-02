import { electionFeature } from "../instance";

type Props = {
  election_id: number;
};

export async function ElectionResult({ election_id }: Props) {
  const result = await electionFeature.service.getResult(election_id);
  if (!result) {
    return (
      <div>
        <h2>No result found for Election ID: {election_id}</h2>
      </div>
    );
  }
  const { preferredProposalId, proposalCount } = result;
  const proposal = await electionFeature.service.getProposalById(
    preferredProposalId
  );

  if (!proposal) {
    return (
      <div>
        <h2>No proposal found for the selected preferred proposal ID.</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>
        Most Voted Proposal is {proposal.proposal} with {proposalCount} Votes
      </h2>
    </div>
  );
}
