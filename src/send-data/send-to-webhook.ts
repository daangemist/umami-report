import axios from 'axios';
import { getConfiguration } from '../configuration';
import { text } from '../render';
import { footer } from '../render/text';
import type { Configuration, WebsiteData } from '../types';

export async function sendToWebhook(configuration: Configuration['output']['webhook'], data: WebsiteData[]) {
  if (configuration === undefined) {
    throw new Error('The configuration is not defined.');
  }

  const globalConfiguration = getConfiguration();
  if (configuration.output === 'text') {
    await axios.post(configuration.url, `${data.map((data) => text(data)).join('\n\n')}\n${footer()}`, {
      headers: {
        'Content-Type': 'text/plain',
      },
    });
  } else {
    await axios.post(
      configuration.url,
      JSON.stringify({
        start: globalConfiguration.start.toISOString(),
        end: globalConfiguration.start.toISOString(),
        ...data,
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
