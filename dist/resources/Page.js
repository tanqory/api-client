"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageResource = void 0;
const site_utils_1 = require("@tanqory/site-utils");
const Base_1 = require("./Base");
class PageResource extends Base_1.Base {
    constructor() {
        super('page');
        this.formId = site_utils_1.SiteFormConfig.SITES_FORM_ID_ONLINE_STORE_PAGE;
    }
    async getAllPages(options = {}) {
        return await this.docs(options);
    }
    async getPage(id) {
        return await this.doc(id);
    }
}
exports.PageResource = PageResource;
//# sourceMappingURL=Page.js.map