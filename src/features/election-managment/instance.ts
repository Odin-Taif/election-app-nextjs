import { publicFeature } from "../public-managment";
import { createElectionFeature } from "./feature";

const serviceMethods = {
  seedPublicVoters: publicFeature.service.seedPublicVoters,
  getPublicVoters: publicFeature.service.getPublicVoters,
  seedPublicProposalPreference:
    publicFeature.service.seedPublicProposalPreference,
  seedRepresentativePublicPreference:
    publicFeature.service.seedRepresentativePublicPreference,
  getHighestPreferredProposal: publicFeature.service
    .getHighestPreferredProposal as () => Promise<unknown>,
};

export const electionFeature = createElectionFeature(serviceMethods);
