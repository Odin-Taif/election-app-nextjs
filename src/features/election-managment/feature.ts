import { createRepository } from "./repository";
import { createService } from "./service";
import { PUBLIC_SERVICE_METHODS } from "./types";

export function createFeature(publicServicesMethods: PUBLIC_SERVICE_METHODS) {
  const repository = createRepository();
  const service = createService(repository, publicServicesMethods);
  return {
    service,
  };
}
