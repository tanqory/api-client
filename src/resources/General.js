// src/resources/General.js

const { SiteFormConfig } = require('@tanqory/site-utils');
const Base = require('./Base');

class General extends Base {
  constructor() {
    super('general');
    this.formId = SiteFormConfig.SITES_SETTING_FORM_ID_GENERAL
  }
  async all() {
    return await this.docs().then(data => data.items[0]);
  }
}

module.exports = General;