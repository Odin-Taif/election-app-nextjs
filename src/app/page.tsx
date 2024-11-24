import { electionFeatureInstance } from "@/features/election-managment";
import { repersentativeFeature } from "@/features/representative-managment";
import { ElectionForm, ElectionsList } from "@/features/election-managment/ui";
import { Container } from "@/ui/components";
import { RepresentativeForm } from "@/features/representative-managment/ui";

export default async function Home() {
  const elections = await electionFeatureInstance.service.getElections();
  const electionNames =
    await repersentativeFeature.service.getElectionNamesToRunFor();
  return (
    <Container>
      <h4>Election page</h4>
      <ElectionForm />
      {/* <ElectionsList elections={elections} />
      <RepresentativeForm electionNames={electionNames} /> */}
    </Container>
  );
}
