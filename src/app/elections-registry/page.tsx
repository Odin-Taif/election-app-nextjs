import { ElectionsList } from "@/features/election-managment/ui";
import { Container } from "@/ui/components";
export default async function Page() {
  return (
    <Container>
      <h4> Elections</h4>
      <ElectionsList />
    </Container>
  );
}
