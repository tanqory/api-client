"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const site_utils_1 = require("@tanqory/site-utils");
const Base_1 = require("./Base");
class Blog extends Base_1.Base {
    constructor() {
        super('blog');
        this.formId = site_utils_1.SiteFormConfig.SITES_FORM_ID_ONLINE_STORE_BLOG;
    }
    async getAllBlogPosts(options = {}) {
        return await this.docs(options);
    }
    async getBlogPost(id) {
        return await this.doc(id);
    }
}
exports.Blog = Blog;
//# sourceMappingURL=Blog.js.map