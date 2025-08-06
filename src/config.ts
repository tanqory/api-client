import { API_AUTH, API_FORMS, API_SITES, API_STORAGE } from './endpoints';
import { TanqoryConfig, TanqoryInitOptions } from './types';

let config: TanqoryConfig = {
  accessToken: null,
  refreshToken: null,
  apiFormsUrl: API_FORMS,
  apiStorageUrl: API_STORAGE,
  apiSitesUrl: API_SITES,
  apiAuthUrl: API_AUTH,
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
  if (options && options.apiFormsUrl) {
    config.apiFormsUrl = options.apiFormsUrl;
    console.log(`Tanqory Library: APIs From URL has been set to ${config.apiFormsUrl}`);
  }
  if (options && options.apiStorageUrl) {
    config.apiStorageUrl = options.apiStorageUrl;
    console.log(`Tanqory Library: APIs Storage URL has been set to ${config.apiStorageUrl}`);
  }
  if (options && options.apiSitesUrl) {
    config.apiSitesUrl = options.apiSitesUrl;
    console.log(`Tanqory Library: APIs Site URL has been set to ${config.apiSitesUrl}`);
  }
  if (options && options.apiAuthUrl) {
    config.apiAuthUrl = options.apiAuthUrl;
    console.log(`Tanqory Library: APIs Auth URL has been set to ${config.apiAuthUrl}`);
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
