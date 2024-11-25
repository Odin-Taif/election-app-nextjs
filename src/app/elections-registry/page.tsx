import { electionFeatureInstance } from "@/features/election-managment";
import { ElectionsList } from "@/features/election-managment/ui";
import { Container } from "@/ui/components";
export default async function Page() {
  const elections = await electionFeatureInstance.service.getElections();
  return (
    <Container>
      <h4> Elections</h4>
      <ElectionsList elections={elections} />
    </Container>
  );
}
