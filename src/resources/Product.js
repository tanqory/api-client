// src/resources/Product.js

const Base = require('./Base');

class Product extends Base {
  constructor() {
    super('product');
  }

  async searchByName(name) {
    console.log(`Searching for products with name: ${name} for site ${this.config.siteId}`);
    return await this.all().then(result => result.data.filter(p => p.name.includes(name)));
  }
}

module.exports = Product;