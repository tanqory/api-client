"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostResource = void 0;
const site_utils_1 = require("@tanqory/site-utils");
const Base_1 = require("./Base");
class PostResource extends Base_1.Base {
    constructor() {
        super('post');
        this.formId = site_utils_1.SiteFormConfig.SITES_FORM_ID_ONLINE_STORE_POST;
    }
    async getAllPosts(options = {}) {
        return await this.docs(options);
    }
    async getPost(id) {
        return await this.doc(id);
    }
}
exports.PostResource = PostResource;
//# sourceMappingURL=Post.js.map