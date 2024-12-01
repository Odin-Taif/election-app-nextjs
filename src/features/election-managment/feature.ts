import { publicFeature } from "../public-managment";
import { createRepository } from "./repository";
import { createService } from "./service";

export function craeteFeature() {
  const repository = createRepository();
  const publicServices = publicFeature.service;
  const service = createService(repository, publicServices);
  return {
    service,
  };
}
