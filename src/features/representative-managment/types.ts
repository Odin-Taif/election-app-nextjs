export type REPRESENTATIVE = {
  name: string;
  email: string;
  election_id?: number | null;
};

export type ELECTION_SELECTION = {
  name: string;
};

export type PUBLIC_SERVICE_METHODS = {
  seedRepresentativePublicPreference: (electionId: number) => Promise<unknown>;
};
