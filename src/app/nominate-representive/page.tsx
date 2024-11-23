import { repersentativeFeature } from "@/features/representative-managment";
import { RepresentativeForm } from "@/features/representative-managment/ui";
import { Container } from "@/ui/components";

export default async function ReprensentativePage() {
  const elections =
    await repersentativeFeature.service.getElectionNamesToRunFor();

  return (
    <Container>
      <h2>Representative page</h2>
      <h1>Dynamic Election List</h1>

      <RepresentativeForm elections={elections} />
    </Container>
  );
}
