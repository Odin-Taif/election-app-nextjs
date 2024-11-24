import { repersentativeFeature } from "@/features/representative-managment";
import { Container } from "@/ui/components";
import { RepresentativeForm } from "@/features/representative-managment/ui";

export default async function ReprensentativePage() {
  const electionNames =
    await repersentativeFeature.service.getElectionNamesToRunFor();
  return (
    <Container>
      <h4> nomination page</h4>
      <RepresentativeForm electionNames={electionNames} />
    </Container>
  );
}
