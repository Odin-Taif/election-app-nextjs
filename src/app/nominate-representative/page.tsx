import { representativeFeatureInstance } from "@/features/representative-managment";
import { Container } from "@/ui/components";
import { RepresentativeForm } from "@/features/representative-managment/ui";

export default async function Page() {
  const elections =
    await representativeFeatureInstance.service.getElectionsToRunFor();
  return (
    <Container>
      <h4> Nomination Section</h4>
      <RepresentativeForm elections={elections} />
    </Container>
  );
}
