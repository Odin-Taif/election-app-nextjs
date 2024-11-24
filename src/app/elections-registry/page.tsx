import { electionFeatureInstance } from "@/features/election-managment";
import { ElectionsList } from "@/features/election-managment/ui";
import { repersentativeFeature } from "@/features/representative-managment";
import { RepresentativeForm } from "@/features/representative-managment/ui";
import { Container } from "@/ui/components";

export default async function ReprensentativePage() {
  const elections = await electionFeatureInstance.service.getElections();
  const electionNames =
    await repersentativeFeature.service.getElectionNamesToRunFor();

  return (
    <Container>
      <h4> Elections</h4>
      <ElectionsList elections={elections} />

      <h4> Nomination </h4>
      <RepresentativeForm electionNames={electionNames} />
    </Container>
  );
}
