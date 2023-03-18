import { getAuthorizedConfig, getClient, getDateQueryParameters, Stats, Website } from '../services/umami';

export async function fetchStats(token: string, website: Website): Promise<Stats> {
  const client = await getClient();

  const result = await client.get(
    `/api/websites/${website.websiteUuid}/stats?${getDateQueryParameters()}`,
    getAuthorizedConfig(token)
  );

  return result.data;
}
