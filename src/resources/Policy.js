// src/resources/Policy.js

const { SiteFormConfig } = require('@tanqory/site-utils');
const Base = require('./Base');

class Policy extends Base {
  constructor() {
    super('policy');
    this.formId = SiteFormConfig.SITES_SETTING_FORM_ID_PRIVACY_DATA
  }
  async all() {
    return await this.docs().then(data => data.items[0]);
  }
}

module.exports = Policy;