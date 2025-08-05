// src/resources/Collection.js

const Base = require('./Base');

class Collection extends Base {
  constructor() {
    super('collection');
  }

  async searchByName(name) {
    console.log(`Searching for products with name: ${name} for site ${this.config.siteId}`);
    return await this.all().then(result => result.data.filter(p => p.name.includes(name)));
  }
}

module.exports = Collection;