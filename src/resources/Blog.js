// src/resources/Blog.js

const { SiteFormConfig } = require('@tanqory/site-utils');
const Base = require('./Base');

class Blog extends Base {
  constructor() {
    super('blog');
    this.formId = SiteFormConfig.SITES_FORM_ID_ONLINE_STORE_BLOG
  }
  async all(options = {}) {
    return await this.docs(options);
  }
  async find(id) {
    return await this.doc(id);
  }
}

module.exports = Blog;