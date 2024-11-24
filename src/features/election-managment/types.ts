export type ELECTION = {
  id: number;
  name: string;
  status: string | null;
  created_at: string;
  concluded_at: string | null;
};

export type ELECTION_PROPOSAL = {
  election_id: number;
  proposal: string;
};

export type INITIAT_EELECTION = {
  name: string;
};
