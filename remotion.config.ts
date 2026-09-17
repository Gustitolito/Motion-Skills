import path from 'path';
import { Config } from '@remotion/cli/config';
import { enableTailwind } from '@remotion/tailwind-v4';

Config.overrideBundlerConfig((currentConfiguration) => {
  const withTailwind = enableTailwind(currentConfiguration);
  return {
    ...withTailwind,
    resolve: {
      ...withTailwind.resolve,
      alias: {
        ...(withTailwind.resolve?.alias ?? {}),
        '@': path.resolve(process.cwd(), 'src'),
        '@core': path.resolve(process.cwd(), 'src/core'),
        '@shared': path.resolve(process.cwd(), 'src/shared'),
        '@projects': path.resolve(process.cwd(), 'projects'),
      },
    },
  };
});

Config.setOverwriteOutput(true);
