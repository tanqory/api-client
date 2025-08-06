"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuResource = void 0;
const site_utils_1 = require("@tanqory/site-utils");
const Base_1 = require("./Base");
class MenuResource extends Base_1.Base {
    constructor() {
        super('menu');
        this.formId = site_utils_1.SiteFormConfig.SITES_FORM_ID_ONLINE_STORE_MENU;
    }
    async getAllMenus(options = {}) {
        return await this.docs(options);
    }
    async getMenu(id) {
        return await this.doc(id);
    }
}
exports.MenuResource = MenuResource;
//# sourceMappingURL=Menu.js.map