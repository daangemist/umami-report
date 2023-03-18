import axios, { AxiosInstance } from 'axios';
import Debug from 'debug';
import { getConfiguration } from '../../configuration';
export * from './types';

const debug = Debug('umami-report:services:umami');

let client!: AxiosInstance;

export function getClient() {
  if (client) {
    return client;
  }

  client = axios.create({
    baseURL: getConfiguration().endpoint,
  });
  client.interceptors.request.use(function (request) {
    debug('Starting Request %s', request.url);
    return request;
  });
  return client;
}

export function getAuthorizedConfig(token: string) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

export function getDateQueryParameters(): string {
  const configuration = getConfiguration();

  return `start_at=${configuration.start.getTime()}&end_at=${configuration.end.getTime()}`;
}
