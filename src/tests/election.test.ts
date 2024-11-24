import { describe, it } from "node:test";
import { deepEqual } from "node:assert/strict";
import { ELECTION } from "@/features/election-managment/types";

describe("elections", () => {
  it("should return nothing to vote on | 0 case scenario", async () => {
    const elections: ELECTION[] = [];

    deepEqual(elections, []);
  });
});
