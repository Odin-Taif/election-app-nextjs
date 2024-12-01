import { describe, it } from "node:test";
import { deepEqual } from "node:assert/strict";
import { ELECTION } from "@/features/election-managment/types";
import assert from "node:assert";

const electionsZero: ELECTION[] = [];
const electionsOne: ELECTION[] = [
  {
    id: 1,
    name: "one",
    status: "on",
    created_at: null,
    concluded_at: null,
  },
];

const electionsOneFinished: ELECTION[] = [
  {
    id: 1,
    name: "one",
    status: "off",
    created_at: null,
    concluded_at: null,
  },
];

const electionsMany: ELECTION[] = [
  {
    id: 1,
    name: "one",
    status: "on",
    created_at: null,
    concluded_at: null,
  },

  {
    id: 1,
    name: "two",
    status: "on",
    created_at: null,
    concluded_at: null,
  },
];

//skiped for now
describe("elections", () => {
  it("should return no election to vote on | 0 case scenario", async () => {
    deepEqual(electionsZero, []);
  });

  it("should return one election is set up | 1 case scenario", async () => {
    assert(electionsOne.length == 1 && electionsOne[0].status === "on");
  });

  it("should return one finished election | 1 finished electoin case scenario ", async () => {
    assert(
      electionsOneFinished.length == 1 &&
        electionsOneFinished[0].status === "off"
    );
  });

  it("should return no elections vote one | many case finished elections scenario ", async () => {
    deepEqual(
      electionsZero,
      electionsMany.filter((it) => it.status !== "on")
    );
  });
  it("should return two elections or more you can vote one | many case scenario ", async () => {
    assert(
      electionsMany.length > 1 &&
        electionsMany.filter((it) => it.status == "on")
    );
  });
});
