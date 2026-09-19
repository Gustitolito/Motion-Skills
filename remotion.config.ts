import { Config } from '@remotion/cli/config';
import { studioBundlerOverride } from './src/core/bundler/config';

Config.overrideBundlerConfig(studioBundlerOverride);
Config.setOverwriteOutput(true);
