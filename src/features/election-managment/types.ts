import { PUBLIC_VOTER } from "../public-managment/types";

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

export type PUBLIC_SERVICE_METHODS = {
  seedPublicVoters: (numberOfVoters: number) => Promise<PUBLIC_VOTER[]>;
  getPublicVoters: () => Promise<
    {
      name: string;
      id: number;
      email: string | null;
      created_at: Date | null;
    }[]
  >;
  seedPublicPreference: (count: number, electionId: number) => Promise<unknown>;
  seedRepresentativePublicVotes: (count: number) => Promise<unknown>;
  seedVotes: (count: number, electionId: number) => Promise<unknown>;
  getHighestPreferredProposal: (electionId: number) => Promise<unknown>;
};
