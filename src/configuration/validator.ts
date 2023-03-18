import Ajv, { JSONSchemaType } from 'ajv';
import type { Configuration } from '../types';

export const ajv = new Ajv();

const schema: JSONSchemaType<Configuration> = {
  type: 'object',
  properties: {
    auth: {
      type: 'object',
      properties: {
        username: {
          type: 'string',
          nullable: true,
        },
        password: {
          type: 'string',
          nullable: true,
        },
        token: {
          type: 'string',
          nullable: true,
        },
      },
      additionalProperties: false,
    },
    endpoint: {
      type: 'string',
    },
    exclude: {
      type: 'array',
      items: {
        type: 'string',
      },
      nullable: true,
    },
    include: {
      type: 'array',
      items: {
        type: 'string',
      },
      nullable: true,
    },
    period: {
      type: 'number',
      nullable: true,
    },
    metrics: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['url', 'referrer', 'browser', 'os', 'device', 'country', 'event'],
      },
      nullable: true,
    },
    output: {
      type: 'object',
      properties: {
        file: {
          type: 'object',
          properties: {
            path: {
              type: 'string',
            },
            output: {
              type: 'string',
              enum: ['json', 'text'],
              nullable: true,
              default: 'json',
            },
          },
          required: ['path'],
          additionalProperties: false,
          nullable: true,
        },
        telegram: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
            },
            chatId: {
              type: 'string',
            },
          },
          required: ['token', 'chatId'],
          additionalProperties: false,
          nullable: true,
        },
        webhook: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
            },
            output: {
              type: 'string',
              enum: ['json', 'text'],
              nullable: true,
              default: 'json',
            },
          },
          required: ['url'],
          additionalProperties: false,
          nullable: true,
        },
      },
    },
  },
  required: ['endpoint', 'auth'],
};

export const validator = ajv.compile(schema);
