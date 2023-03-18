import { writeFile } from 'node:fs/promises';
import { getConfiguration } from '../configuration';
import { text } from '../render';
import { footer } from '../render/text';
import type { Configuration, WebsiteData } from '../types';

export async function sendToFile(configuration: Configuration['output']['file'], data: WebsiteData[]): Promise<void> {
  if (configuration === undefined) {
    throw new Error('The configuration is not defined.');
  }

  const globalConfiguration = getConfiguration();
  await writeFile(
    configuration.path,
    (configuration.output ?? 'json') === 'json'
      ? JSON.stringify({
          start: globalConfiguration.start.toISOString(),
          end: globalConfiguration.start.toISOString(),
          ...data,
        })
      : `${data.map((data) => text(data)).join('\n\n')}\n${footer()}`
  );
}
