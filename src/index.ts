import yargs from 'yargs';
import Debug from 'debug';
import { initialize } from 'observalyze-sdk';
import { parse } from './configuration';
import { retrieveData } from './retrieve-data';
import { sendData } from './send-data';

const debug = Debug('umami-report:main');

async function main() {
  // use yargs to parse the command line arguments
  const argv = yargs
    .option('config', {
      alias: 'c',
      type: 'string',
      description: 'The location to the configuration file.',
    })
    .help()
    .alias('help', 'h').argv;

  // @ts-expect-error Since argv has no config attribute
  if (!argv['config']) {
    console.log('Please specify a configuration file via -c file.json');
    process.exit(110);
  }

  const observalyze = await initialize({
    apiKey: typeof process.env['DEBUG'] === 'undefined' ? 'gvURSgauLe1DfQ7FvRvDDv' : '',
  });

  try {
    await observalyze.logGenericEvent('script.start');

    // @ts-expect-error Since argv has no config attribute
    const configuration = await parse(argv['config'] ?? '');
    try {
      const data = await retrieveData();
      await sendData(data);
      console.log('Command completed successfully.');
    } catch (error) {
      debug('There was an error retrieving the data. %o', error);
      console.log('There was an retrieving the data.', error instanceof Error ? error.message : error);

      process.exit(105);
    }
  } catch (error) {
    debug('There was an error parsing the config file. %o', error);
    console.log('There was an error parsing the config file.', error instanceof Error ? error.message : error);

    process.exit(100);
  }
}

main();
