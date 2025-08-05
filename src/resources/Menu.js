// src/resources/Menu.js

const { SiteFormConfig } = require('@tanqory/site-utils');
const Base = require('./Base');

class Menu extends Base {
  constructor() {
    super('menu');
    this.formId = SiteFormConfig.SITES_FORM_ID_ONLINE_STORE_MENU
  }
  async all(options = {}) {
    return await this.docs(options);
  }
  async find(id) {
    return await this.doc(id);
  }
}

module.exports = Menu;