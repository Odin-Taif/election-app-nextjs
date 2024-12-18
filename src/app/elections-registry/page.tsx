import { electionFeature } from "@/features/election-managment";
import { ElectionsList } from "@/features/election-managment/ui";
import { Page } from "@/ui/pages";

export default async function ElectoinRegistry() {
  const elections = await electionFeature.service.getElections();
  return (
    <Page title={"Election Registry"}>
      <ElectionsList elections={elections} />
    </Page>
  );
}
