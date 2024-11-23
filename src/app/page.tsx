import { ElectionForm } from "@/features/election-managment/ui";
import { Container } from "@/ui/components";

export default async function Home() {
  return (
    <Container>
      <h2>Election page</h2>
      <ElectionForm />
      
    </Container>
  );
}
