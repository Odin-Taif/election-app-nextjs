import {
  addElectionSchema,
  addProposalSchema,
} from "@/zod-validation/validations-schema";
import { Repository } from "./repository";
import { ELECTION_PROPOSAL, SERVICE_METHODS } from "./types";
import { db } from "@/drizzle-db";
import { votes } from "./schema";
export function createService(
  repository: Repository,
  serviceMethods: SERVICE_METHODS
) {
  async function addElection(name: string) {
    const validation = addElectionSchema.safeParse({ name });
    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      const errorMessages: { name?: string } = {};
      if (errors.name && errors.name.length > 0) {
        errorMessages.name =
          "Election Name is required and should be a valid name.";
      }
      return {
        success: false,
        message: "Validation failed. Please check your input.",
        errors: errorMessages,
      };
    }
    try {
      await repository.initiateElectionInDb(validation.data);
      await serviceMethods.seedPublicVoters(50);
      return {
        success: true,
        message: "Election has been created!",
      };
    } catch (dbError) {
      console.error("Database Error:", dbError);
      return {
        success: false,
        message: "An error occurred while saving the election to the database.",
        errors: dbError,
      };
    }
  }
  async function getElections() {
    return await repository.getElectionsFromDb();
  }
  async function addProposal({ election_id, proposal }: ELECTION_PROPOSAL) {
    const validation = addProposalSchema.safeParse({
      election_id,
      proposal,
    });

    if (!validation.success) {
      const errors = validation.error.flatten().fieldErrors;
      const errorMessages: { proposal?: string } = {};
      if (errors.proposal && errors.proposal.length > 0) {
        errorMessages.proposal =
          "Election proposal is required and should be a valid proposal name.";
      }
      return {
        success: false,
        message: "Validation failed. Please check your input.",
        errors: errorMessages,
      };
    }
    try {
      await repository.addProposalToElection({ election_id, proposal });
      await serviceMethods.seedPublicProposalPreference(election_id);
      return {
        success: true,
        message: "Proposal has been added!",
        errors: {},
      };
    } catch (dbError) {
      console.error("Database Error:", dbError);
      return {
        success: false,
        message: "An error occurred while saving the proposal to the database.",
        errors: dbError,
      };
    }
  }
  async function getProposalById(proposalId: number) {
    const proposal = await repository.getProposalByIdFromDb(proposalId);
    return proposal;
  }
  async function getProposalsForElection(election_id: number) {
    const preferredProposalId = await repository.getProposalsForElectionFromDb(
      election_id
    );
    return preferredProposalId;
  }
  async function choseRepresentative(election_id: number) {
    await serviceMethods.seedRepresentativePublicPreference(election_id);
  }
  async function seedRepresentativePreference(election_id: number) {
    const representatives = await serviceMethods.getRepresentativesByElection(
      election_id
    );
    const electionProposals = await getProposalsForElection(election_id);

    if (representatives.length === 0 || electionProposals.length === 0) {
      console.error("No representatives or election proposals found.");
      return;
    }

    const existingPreferences =
      await serviceMethods.getRepresentativePreferencesForElection(election_id);
    const existingRepresentativeIds = new Set(
      existingPreferences.map((p) => p.representative_id)
    );
    const newPreferences = [];
    const updatedPreferences = [];

    for (const representative of representatives) {
      const preferredProposal =
        electionProposals[Math.floor(Math.random() * electionProposals.length)];

      if (existingRepresentativeIds.has(representative.id)) {
        updatedPreferences.push({
          representative_id: representative.id,
          election_proposal_id: preferredProposal.id,
          election_id,
        });
      } else {
        newPreferences.push({
          representative_id: representative.id,
          election_proposal_id: preferredProposal.id,
          election_id,
        });
      }
    }

    try {
      if (newPreferences.length > 0) {
        await Promise.all(
          newPreferences.map((preference) =>
            serviceMethods.addRepresentativePreferenceInDb(preference)
          )
        );
        console.log(
          `${newPreferences.length} new Representative Preferences seeded successfully`
        );
      }

      if (updatedPreferences.length > 0) {
        await Promise.all(
          updatedPreferences.map((preference) =>
            serviceMethods.updateRepresentativePreference(
              preference.representative_id,
              preference.election_proposal_id
            )
          )
        );
        console.log(
          `${updatedPreferences.length} Representative Preferences updated successfully`
        );
      }
    } catch (error) {
      console.error(
        "Error seeding or updating Representative Preferences:",
        error
      );
    }
  }
  async function runElection(election_id: number) {
    console.log("run election");
    // const representatives = await serviceMethods.getRepresentativesByElection(
    //   election_id
    // );
    // if (representatives.length === 0) {
    //   console.error("No representatives found for the election.");
    //   return;
    // }
    // const electionProposals = await getProposalsForElection(election_id);
    // if (electionProposals.length === 0) {
    //   console.error("No proposals found for the election.");
    //   return;
    // }

    // const votesData = representatives.map((representative) => {
    //   const randomProposal =
    //     electionProposals[Math.floor(Math.random() * electionProposals.length)];
    //   return {
    //     representative_id: representative.id,
    //     election_proposal_id: randomProposal.id,
    //   };
    // });

    // try {
    //   await db.insert(votes).values(votesData);
    //   console.log(
    //     `All representatives have voted for proposals in election ${election_id}.`
    //   );
    // } catch (error) {
    //   console.error("Error saving votes for the election:", error);
    // }
  }
  async function getResult(election_id: number) {
    console.log("result");
    // const winnerRepresentaive =
    //   await serviceMethods.getRepresentativeWithMostVotes(election_id);
    // if (!winnerRepresentaive) {
    //   return {
    //     proposalChosen: null,
    //     winnerRepresentaive: null,
    //     winner: null,
    //   };
    // }
    // const winner = await serviceMethods.getReprensentativeById(
    //   winnerRepresentaive.representative_id
    // );
    // const proposal = await serviceMethods.getHighestPreferredProposal(
    //   election_id
    // );
    // if (!proposal) {
    //   console.log("No preferred proposal found for this election.");
    //   return {
    //     proposalChosen: null,
    //     winnerRepresentaive,
    //     winner,
    //   };
    // }
    // const proposalChosen = await getProposalById(proposal.preferredProposalId);
    // return {
    //   proposalChosen,
    //   winnerRepresentaive,
    //   winner,
    // };
  }
  return {
    addElection,
    getElections,
    addProposal,
    choseRepresentative,
    getProposalsForElection,
    getProposalById,
    getResult,
    runElection,
    seedRepresentativePreference,
  };
}
