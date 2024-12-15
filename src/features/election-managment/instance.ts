import { publicFeature } from "../public-managment";
import { representativeFeature } from "../representative-managment";
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
  getRepresentativeWithMostVotes:
    publicFeature.service.getRepresentativeWithMostVotes,
  getRepresentativesByElection:
    representativeFeature.service.getRepresentativesByElection,
  getReprensentativeById: representativeFeature.service.getReprensentativeById,
};

export const electionFeature = createElectionFeature(serviceMethods);
