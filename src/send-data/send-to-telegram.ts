import { TelegramClient } from 'messaging-api-telegram';
import { text } from '../render';
import { footer } from '../render/text';
import type { Configuration, WebsiteData } from '../types';

export async function sendToTelegram(
  configuration: Configuration['output']['telegram'],
  data: WebsiteData[]
): Promise<void> {
  if (configuration === undefined) {
    throw new Error('The Telegram configuration is not defined.');
  }

  const telegram = new TelegramClient({
    accessToken: configuration.token,
  });

  for (const website of data) {
    await telegram.sendMessage(configuration.chatId, `${text(website)}\n${footer()}`);
  }
}
