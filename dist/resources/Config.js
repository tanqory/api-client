"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const config_1 = require("../config");
class Config {
    constructor() {
        this.config = (0, config_1.getConfig)();
    }
    accessToken() {
        return this.config.accessToken;
    }
    refreshToken() {
        return this.config.refreshToken;
    }
    siteId() {
        return this.config.siteId;
    }
    apiUrl() {
        return this.config.apiUrl;
    }
}
exports.Config = Config;
//# sourceMappingURL=Config.js.map