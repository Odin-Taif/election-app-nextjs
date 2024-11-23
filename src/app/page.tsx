import { ElectionForm } from "@/features/election-managment/ui";
import { Container } from "@/ui/components";

export default function Home() {
  return (
    <Container>
      <h2>Election page</h2>
      <ElectionForm />
    </Container>
  );
}
