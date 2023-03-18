import { getAuthorizedConfig, getClient, getDateQueryParameters, Metric, Website } from '../services/umami';
import type { ConfigurationMetric } from '../types';

export async function fetchMetrics(token: string, website: Website, metric: ConfigurationMetric): Promise<Metric[]> {
  const client = await getClient();

  const result = await client.get<Metric[]>(
    `/api/websites/${website.websiteUuid}/metrics?type=${metric}&${getDateQueryParameters()}`,
    getAuthorizedConfig(token)
  );

  return result.data
    .sort((a, b) => a.y - b.y)
    .reverse()
    .slice(0, 5);
}
