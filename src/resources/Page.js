// src/resources/Page.js

const { SiteFormConfig } = require('@tanqory/site-utils');
const Base = require('./Base');

class Page extends Base {
  constructor() {
    super('page');
    this.formId = SiteFormConfig.SITES_FORM_ID_ONLINE_STORE_PAGE
  }
  async all(options = {}) {
    return await this.docs(options);
  }
  async find(id) {
    return await this.doc(id);
  }
}

module.exports = Page;