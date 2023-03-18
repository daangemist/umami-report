export type Website = {
  id: number;
  websiteUuid: string;
  userId: number;
  name: string;
  domain: string;
  shareId: string | null;
  createdAt: string;
};

export type Delta = {
  value: number;
  change: number;
};

export type Stats = {
  pageviews: Delta;
  uniques: Delta;
  bounces: Delta;
  totaltime: Delta;
};

export type Metric = {
  x: string;
  y: number;
};
