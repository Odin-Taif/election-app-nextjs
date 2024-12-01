import { createRepository } from "./repository";
import { createService } from "./service";

export function craeteFeature() {
  const repository = createRepository();
  const service = createService(repository);
  return {
    service,
  };
}
