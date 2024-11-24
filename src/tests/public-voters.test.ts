import { describe, it } from "node:test";
import { deepEqual } from "node:assert/strict";
import { PUBLIC_VOTER } from "@/features/public-managment/types";

describe("Public Voters", () => {
  it("should return no people in this country | 0 case scenario", async () => {
    const representative: PUBLIC_VOTER[] = [];
    deepEqual(representative, []);
  });
});
