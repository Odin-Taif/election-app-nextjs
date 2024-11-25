import { representativeFeatureInstance } from "@/features/representative-managment";
import { RepresentativeForm } from "@/features/representative-managment/ui";
import { Page } from "@/ui/pages";

export default async function NominateRepresentative() {
  const elections =
    await representativeFeatureInstance.service.getElectionsToRunFor();

  return (
    <Page title={"Nomination Section"}>
      <RepresentativeForm elections={elections} />
    </Page>
  );
}
