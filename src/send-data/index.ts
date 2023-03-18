import { getConfiguration } from '../configuration';
import type { WebsiteData } from '../types';
import { sendToFile } from './send-to-file';
import { sendToTelegram } from './send-to-telegram';
import { sendToWebhook } from './send-to-webhook';

export async function sendData(data: WebsiteData[]): Promise<void> {
  const configuration = getConfiguration();
  if (configuration.output.file) {
    await sendToFile(configuration.output.file, data);
  }

  if (configuration.output.telegram) {
    await sendToTelegram(configuration.output.telegram, data);
  }

  if (configuration.output.webhook) {
    await sendToWebhook(configuration.output.webhook, data);
  }
}
