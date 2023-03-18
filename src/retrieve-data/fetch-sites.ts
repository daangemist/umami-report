import { getConfiguration } from '../configuration';
import { getAuthorizedConfig, getClient, Website } from '../services/umami';

export async function fetchSites(token: string): Promise<Website[]> {
  const client = await getClient();

  const result = await client.get('/api/websites', getAuthorizedConfig(token));

  const { exclude, include } = getConfiguration();
  const filteredWebsites = result.data.filter((website: Website) => {
    if (exclude && exclude.includes(website.websiteUuid)) {
      return false;
    } else if (exclude) {
      return true;
    }

    if (include && include.includes(website.websiteUuid)) {
      return true;
    } else if (include) {
      return false;
    }
    return true;
  });
  return filteredWebsites;
}
