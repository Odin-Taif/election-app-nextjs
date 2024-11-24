import { electionFeatureInstance } from "@/features/election-managment";
import { ElectionsList } from "@/features/election-managment/ui";
import { Container } from "@/ui/components";

export default async function ReprensentativePage() {
  const elections = await electionFeatureInstance.service.getElections();

  return (
    <Container>
      <h4> elections registery page</h4>
      <ElectionsList elections={elections} />
    </Container>
  );
}
