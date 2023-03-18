import type { Metric, Stats, Website } from '../services/umami';

export type ConfigurationMetric = 'url' | 'referrer' | 'browser' | 'os' | 'device' | 'country' | 'event';

export type Configuration = {
  auth: {
    username?: string;
    password?: string;
    token?: string;
  };
  endpoint: string;
  exclude?: string[];
  include?: string[];
  period?: number;
  metrics?: Array<ConfigurationMetric>;
  output: {
    file?: {
      path: string;
      output?: 'text' | 'json';
    };
    telegram?: {
      token: string;
      chatId: string;
    };
    webhook?: {
      url: string;
      output?: 'text' | 'json';
    };
  };
};

export type AugmentedConfiguration = Configuration & {
  start: Date;
  end: Date;
};

export type WebsiteData = {
  website: Website;
  stats: Stats;
  metrics: Record<string, Array<Metric>>;
};
