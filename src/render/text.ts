import { getConfiguration } from '../configuration';
import type { WebsiteData } from '../types';

function plusOrMin(value: number): '+' | '-' {
  return value > 0 ? '+' : '-';
}

export function text(data: WebsiteData): string {
  const configuration = getConfiguration();

  return `${data.website.name} (${
    data.website.domain
  })\n${configuration.start.toISOString()} - ${configuration.end.toISOString()}

Pageviews: ${data.stats.pageviews.value} (${plusOrMin(data.stats.pageviews.change)}${data.stats.pageviews.change})
Unique visitors: ${data.stats.uniques.value} (${plusOrMin(data.stats.uniques.change)}${data.stats.uniques.change})
Bounces: ${data.stats.bounces.value} (${plusOrMin(data.stats.bounces.change)}${data.stats.bounces.change})
Total time: ${data.stats.totaltime.value}s (${plusOrMin(data.stats.totaltime.change)}${data.stats.totaltime.change})

${Object.entries(data.metrics)
  .map(
    ([metric, values]) =>
      `${metric}:\n${values.map((value) => `${value.x ? value.x : '<empty>'}: ${value.y}`).join('\n')}\n`
  )
  .join('\n')}`;
}

export function footer(): string {
  return 'Report generated by umami-report';
}