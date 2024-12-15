import { electionFeature } from "../instance";

type Props = {
  election_id: number;
};

export async function ElectionResult({ election_id }: Props) {
  const { winnerRepresentaive, winner, proposalChosen } =
    await electionFeature.service.getResult(election_id);
  if (!winnerRepresentaive || !winner || !proposalChosen) {
    return (
      <div>
        <h2>No result found for Election ID: {election_id}</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>
        <pre> Most Voted Proposal is {proposalChosen.proposal} with</pre>
        <pre>{winnerRepresentaive.votes_count} Votes</pre>
        <pre>
          Election&apos;s winner is{" "}
          <strong>
            {winner && winner.length > 0 ? winner[0].name : "No winner"}
          </strong>
        </pre>
      </h2>
    </div>
  );
}
