import { RepresentativeForm } from ".";
import { ELECTION_SELECTION } from "../types";

export async function ChoseElectionForRepresentative() {
  // let elections = await db.select().from(posts)

  const elections: ELECTION_SELECTION[] = [
    { name: "soso" },
    { name: "soso" },
    { name: "soso" },
  ];

  return (
    <div>
      <RepresentativeForm elections={elections} />
    </div>
  );
}
