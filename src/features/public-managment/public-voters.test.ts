import { describe, it } from "node:test";
import { deepEqual } from "node:assert/strict";
import { PUBLIC_VOTER } from "@/features/public-managment/types";

const publicVotersZero: PUBLIC_VOTER[] = [];
const publicVotersOne: PUBLIC_VOTER[] = [];

describe.skip("Public Voters", () => {
  it("should return no people in this country | 0 case scenario", async () => {
    deepEqual(publicVotersZero, []);
  });

  it.skip("should return no people in this country | 1 case scenario", async () => {
    deepEqual(publicVotersOne, []);
  });
});
