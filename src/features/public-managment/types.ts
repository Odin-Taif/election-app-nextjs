export type PUBLIC_VOTER = {
  name: string;
};

export type VOTE = {
  public_voter_id: number;
  election_proposal_id: number;
  representative_id: number;
};
