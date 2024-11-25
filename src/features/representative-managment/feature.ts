import { createRepository } from "./repository";
import { createService } from "./service";

export function createFeature() {
  const repository = createRepository();
  const service = createService(repository);
  return {
    service,
  };
}

export const representativeFeatureInstance = createFeature();
