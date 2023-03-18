import { readFile } from 'node:fs/promises';
import type { AugmentedConfiguration, Configuration } from '../types';
import { ajv, validator } from './validator';

let configuration: AugmentedConfiguration | undefined;

const defaults: Partial<Configuration> = {
  period: 7, // 7 days, by default
  metrics: ['url', 'referrer', 'browser', 'os', 'device', 'country', 'event'],
};

export async function parse(filename: string): Promise<AugmentedConfiguration> {
  const contents = await readFile(filename, 'utf8');

  const readConfiguration = JSON.parse(contents) as Configuration;

  if (!validator(readConfiguration)) {
    throw new Error(ajv.errorsText(validator.errors, { dataVar: 'config' }));
  }

  if (Array.isArray(readConfiguration.exclude) && Array.isArray(readConfiguration.include)) {
    throw new Error('You cannot specify both exclude and include.');
  }

  // replace env vars
  const finalConfiguration = {
    ...defaults,
    ...readConfiguration,
  };

  const end = new Date();
  const start = new Date(end.getTime() - (finalConfiguration.period || defaults.period || 7) * 24 * 60 * 60 * 1000);

  configuration = {
    ...finalConfiguration,
    start,
    end,
  };
  return configuration;
}

export function getConfiguration(): AugmentedConfiguration {
  if (!configuration) {
    throw new Error('Configuration has not been loaded yet.');
  }
  return configuration;
}
