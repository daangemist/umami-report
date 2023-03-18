import { getConfiguration } from '../configuration';
import type { Website } from '../services/umami';
import type { WebsiteData } from '../types';
import { getToken } from './auth';
import { fetchMetrics } from './fetch-metrics';
import { fetchSites } from './fetch-sites';
import { fetchStats } from './fetch-stats';

const ALL_METRICS = ['url', 'referrer', 'browser', 'os', 'device', 'country', 'event'] as const;

export async function getMetricsObject(token: string, website: Website) {
  const configuration = getConfiguration();
  const metrics = await Promise.all(
    (configuration.metrics ?? ALL_METRICS).map(async (metric) => {
      return {
        [metric]: await fetchMetrics(token, website, metric),
      };
    })
  );

  return metrics.reduce((acc, cur) => Object.assign(acc, cur), {});
}

export async function retrieveData(): Promise<WebsiteData[]> {
  const token = await getToken();

  const websites = await fetchSites(token);

  const stats = await Promise.all(
    websites.map(async (website) => {
      return {
        website,
        stats: await fetchStats(token, website),
        metrics: await getMetricsObject(token, website),
      };
    })
  );

  return stats;
}
