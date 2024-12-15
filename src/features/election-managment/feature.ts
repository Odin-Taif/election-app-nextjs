import { createRepository } from "./repository";
import { createService } from "./service";
import { SERVICE_METHODS } from "./types";

export function createElectionFeature(serviceMethods: SERVICE_METHODS) {
  const repository = createRepository();
  const service = createService(repository, serviceMethods);
  return {
    service,
  };
}
