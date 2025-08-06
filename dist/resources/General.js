"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.General = void 0;
const site_utils_1 = require("@tanqory/site-utils");
const Base_1 = require("./Base");
class General extends Base_1.Base {
    constructor() {
        super('general');
        this.formId = site_utils_1.SiteFormConfig.SITES_SETTING_FORM_ID_GENERAL;
    }
    async getSettings() {
        var _a;
        const data = await this.docs();
        return ((_a = data.items) === null || _a === void 0 ? void 0 : _a[0]) || {};
    }
}
exports.General = General;
//# sourceMappingURL=General.js.map