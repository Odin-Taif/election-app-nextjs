export type ELECTION = {
  id: number;
  name: string;
  proposals: string[] | null;
};

export type INITIAT_EELECTION = {
  name: string;
};

export type ADD_PROPOSAL = {
  electionId: string;
  proposal: string;
};
