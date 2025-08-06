"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Policy = void 0;
const site_utils_1 = require("@tanqory/site-utils");
const Base_1 = require("./Base");
class Policy extends Base_1.Base {
    constructor() {
        super('policy');
        this.formId = site_utils_1.SiteFormConfig.SITES_SETTING_FORM_ID_PRIVACY_DATA;
    }
    async getAllPolicies() {
        var _a;
        const data = await this.docs();
        return ((_a = data.items) === null || _a === void 0 ? void 0 : _a[0]) || {};
    }
}
exports.Policy = Policy;
//# sourceMappingURL=Policy.js.map