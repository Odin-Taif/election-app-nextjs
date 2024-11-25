import { Page } from "@/ui/pages";
import { AddElection } from "@/features/election-managment/ui";
export default function Home() {
  return (
    <Page title={"Election page"}>
      <AddElection />
    </Page>
  );
}
