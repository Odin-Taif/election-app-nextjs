import { AddElection } from "@/features/election-managment/ui";
import { Container } from "@/ui/components";

export default async function Home() {
  return (
    <Container>
      <h4>Election page</h4>
      <AddElection />
    </Container>
  );
}
