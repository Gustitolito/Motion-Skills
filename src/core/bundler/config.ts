import path from "node:path";
import type { BundlerOverrideFn } from "@remotion/bundler";
import { enableTailwind } from "@remotion/tailwind-v4";

export const studioBundlerOverride: BundlerOverrideFn = (
  currentConfiguration,
) => {
  const withTailwind = enableTailwind(currentConfiguration);
  return {
    ...withTailwind,
    resolve: {
      ...withTailwind.resolve,
      alias: {
        ...(withTailwind.resolve?.alias ?? {}),
        "@": path.resolve(process.cwd(), "src"),
        "@core": path.resolve(process.cwd(), "src/core"),
        "@shared": path.resolve(process.cwd(), "src/shared"),
        "@projects": path.resolve(process.cwd(), "projects"),
      },
    },
  };
};
