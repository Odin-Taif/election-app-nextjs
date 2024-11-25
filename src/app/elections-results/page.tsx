import { electionFeatureInstance } from "@/features/election-managment";
import { ElectionRsult } from "@/features/election-managment/ui";
import { representativeFeatureInstance } from "@/features/representative-managment";
import { Page } from "@/ui/pages";

export default async function ElectionResult() {
  const votesOnProposals =
    await electionFeatureInstance.service.getVotesCountsOnProposal();
  const winners =
    await representativeFeatureInstance.service.getElectionWinners();
  return (
    <Page title={"Election Results"}>
      <ElectionRsult />
      <pre>{JSON.stringify(votesOnProposals, null, 2)}</pre>
      <h2 className="text-red-400">
        Winner Winner Winner Winner chicken dinner
      </h2>
      <pre>{JSON.stringify(winners, null, 2)}</pre>
    </Page>
  );
}
