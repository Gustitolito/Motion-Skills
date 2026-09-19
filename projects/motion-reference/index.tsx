import type { RegisteredProject } from "@core/registry/project-contract";
import { projectConfig } from "./project.config";
export const project: RegisteredProject = {
  config: projectConfig,
  compositions: [
    {
      id: "reference-premium",
      title: "Premium",
      component: () => import("./compositions/premium"),
      durationInFrames: 240,
      fps: 30,
      width: 1920,
      height: 1080,
    },
    {
      id: "reference-promo",
      title: "Promo",
      component: () => import("./compositions/promo"),
      durationInFrames: 240,
      fps: 30,
      width: 1920,
      height: 1080,
    },
    {
      id: "reference-editorial",
      title: "Editorial",
      component: () => import("./compositions/editorial"),
      durationInFrames: 240,
      fps: 30,
      width: 1920,
      height: 1080,
    },
    {
      id: "reference-data",
      title: "Data",
      component: () => import("./compositions/data"),
      durationInFrames: 240,
      fps: 30,
      width: 1920,
      height: 1080,
    },
  ],
};
