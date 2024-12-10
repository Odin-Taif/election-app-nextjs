import { publicFeature } from "../public-managment";
import { createFeature } from "./feature";

const publicServiceMethods = {
  seedPublicVoters: publicFeature.service.seedPublicVoters,
  getPublicVoters: publicFeature.service.getPublicVoters,
  seedPublicPreference: publicFeature.service.seedPublicPreference,
  seedRepresentativePublicVotes:
    publicFeature.service.seedRepresentativePublicVotes,
  seedVotes: publicFeature.service.seedVotes as () => Promise<unknown>,
  getHighestPreferredProposal: publicFeature.service
    .getHighestPreferredProposal as () => Promise<unknown>,
};

export const electionFeature = createFeature(publicServiceMethods);
