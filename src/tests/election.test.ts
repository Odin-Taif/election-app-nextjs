import { describe, it } from "node:test";
import { deepEqual } from "node:assert/strict";
import { ELECTION } from "@/features/election-managment/types";
import assert from "node:assert";

const electionsZero: ELECTION[] = [];
const electionsOne: ELECTION[] = [
  {
    id: 1,
    name: "election-1",
    proposals: [],
  },
];

const electionsMany: ELECTION[] = [
  {
    id: 1,
    name: "election-1",
    proposals: [],
  },

  {
    id: 2,
    name: "election-1",
    proposals: [],
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const timeSpanForElection: number = 4;
//skiped for now
describe.skip("elections", () => {
  it("should return nothing to vote on | 0 case scenario", async () => {
    deepEqual(electionsZero, []);
  });

  it("should return one election is set up | 1 case scenario", async () => {
    assert(electionsOne.length == 1);
  });

  it("should return two elections you can vote one | 2 case scenario", async () => {
    assert(electionsMany.length > 1);
  });
});
