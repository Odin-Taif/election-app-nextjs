import { electionFeatureInstance } from "@/features/election-managment";
import { ElectionRsult, ElectionsList } from "@/features/election-managment/ui";
import { Page } from "@/ui/pages";

export default async function Registry() {
  const votesOnProposals =
    await electionFeatureInstance.service.getVotesCountsOnProposal();
  const elections = await electionFeatureInstance.service.getElections();
  console.log(votesOnProposals);
  return (
    <Page title={"Election Registry"}>
      <ElectionRsult />
      {/* <ElectionsList elections={elections} /> */}
    </Page>
  );
}
