import { electionFeatureInstance } from "@/features/election-managment";
import { ElectionForm, ElectionsList } from "@/features/election-managment/ui";

import { Container } from "@/ui/components";

export default async function Home() {
  const elections = await electionFeatureInstance.service.getElections();
  console.log(elections);
  return (
    <Container>
      <h2>Election page</h2>

      <ElectionsList elections={elections} />
      <ElectionForm />
    </Container>
  );
}
