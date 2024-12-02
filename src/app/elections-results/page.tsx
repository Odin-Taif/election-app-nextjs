import { electionFeature } from "@/features/election-managment";
// import { ElectionRsult } from "@/features/election-managment/ui";
import { Page } from "@/ui/pages";

export default async function ElectionResult() {
  return (
    <Page title={"Election Results"}>
      <h2 className="text-red-400">
        Winner Winner Winner Winner chicken dinner
      </h2>
    </Page>
  );
}
