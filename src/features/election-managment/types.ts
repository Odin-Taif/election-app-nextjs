export type ELECTION = {
  id: number;

  name: string;

  status: string | null;

  created_at: Date | null;

  concluded_at: Date | null;
};

export type ELECTION_PROPOSAL = {
  election_id: number;
  proposal: string;
};

export type INITIAT_EELECTION = {
  name: string;
};
