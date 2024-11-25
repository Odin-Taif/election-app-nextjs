import { ReactNode } from "react";
import { Container } from "@/ui/components";
type Props = {
  title: string;
  children: ReactNode;
};
export function Page({ children, title }: Props) {
  return (
    <Container>
      <h2>{title}</h2>
      {children}
    </Container>
  );
}
