import { electionFeatureInstance } from "@/features/election-managment";
import {
  ElectionForm,
  ElectionsList,
  ProposalForm,
} from "@/features/election-managment/ui";

import { Container } from "@/ui/components";

export default async function Home() {
  const elections = await electionFeatureInstance.service.getElections();

  return (
    <Container>
      <h2>Election page</h2>
      <ElectionForm />
      <ElectionsList elections={elections} />
    </Container>
  );
}
