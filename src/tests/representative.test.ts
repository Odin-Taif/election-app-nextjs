import { describe, it } from "node:test";
import { deepEqual } from "node:assert/strict";
import { REPRESENTATIVE } from "@/features/representative-managment/types";

describe("Represntaive", () => {
  it("should return please nominate representative for the election| 0 case scenario", async () => {
    const representative: REPRESENTATIVE[] = [];
    deepEqual(representative, []);
  });
});
