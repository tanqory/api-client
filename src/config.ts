import { TanqoryConfig, TanqoryInitOptions } from './types';

let config: TanqoryConfig = {
  accessToken: null,
  refreshToken: null,
  apiUrl: 'https://api.tanqory.com',
  siteId: null
};

export const setConfig = (options: TanqoryInitOptions): void => {
  if (options && options.accessToken) {
    config.accessToken = options.accessToken;
    console.log("Tanqory Library: Access Token has been set.");
  }
  if (options && options.refreshToken) {
    config.refreshToken = options.refreshToken;
    console.log("Tanqory Library: Refresh Token has been set.");
  }
  if (options && options.siteId) {
    config.siteId = options.siteId;
    console.log(`Tanqory Library: Site ID has been set to ${config.siteId}`);
  }
};

export const getConfig = (): TanqoryConfig => {
  return config;
};

export const checkConfig = (): void => {
  if (!config.accessToken || !config.siteId) {
    throw new Error("Tanqory Library: Access Token or Site ID is not set. Please call Tanqory.init() with both values first.");
  }
};
