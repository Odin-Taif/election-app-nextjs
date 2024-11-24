import { electionFeatureInstance } from "@/features/election-managment";
import { ElectionForm, ElectionsList } from "@/features/election-managment/ui";

import { Container } from "@/ui/components";

export default async function Home() {
  const elections = await electionFeatureInstance.service.getElections();

  return (
    <Container>
      <h4>Election page</h4>
      <ElectionForm />
      <ElectionsList elections={elections} />
    </Container>
  );
}
