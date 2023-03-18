import { getConfiguration } from '../../configuration';
import { getClient } from '../../services/umami';

export async function getToken(): Promise<string> {
  const configuration = getConfiguration();
  if (typeof configuration.auth.token === 'string') {
    return configuration.auth.token;
  }

  const client = await getClient();
  const result = await client.post('/api/auth/login', {
    username: configuration.auth.username,
    password: configuration.auth.password,
  });

  return result.data.token;
}
