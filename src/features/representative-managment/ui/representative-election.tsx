import { RepresentativeForm } from ".";

export async function ChoseElectionForRepresentative() {
  // let elections = await db.select().from(posts)

  const elections = [
    { proposal: "1", name: "soso" },
    { proposal: "2", name: "soso" },
    { proposal: "3", name: "soso" },
  ];

  return (
    <div>
      <RepresentativeForm elections={elections} />
    </div>
  );
}
