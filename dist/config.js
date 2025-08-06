"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkConfig = exports.getConfig = exports.setConfig = void 0;
const endpoints_1 = require("./endpoints");
let config = {
    accessToken: null,
    refreshToken: null,
    apiFormsUrl: endpoints_1.API_FORMS,
    apiStorageUrl: endpoints_1.API_STORAGE,
    apiSitesUrl: endpoints_1.API_SITES,
    apiAuthUrl: endpoints_1.API_AUTH,
    siteId: null
};
const setConfig = (options) => {
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
exports.setConfig = setConfig;
const getConfig = () => {
    return config;
};
exports.getConfig = getConfig;
const checkConfig = () => {
    if (!config.accessToken || !config.siteId) {
        throw new Error("Tanqory Library: Access Token or Site ID is not set. Please call Tanqory.init() with both values first.");
    }
};
exports.checkConfig = checkConfig;
//# sourceMappingURL=config.js.map