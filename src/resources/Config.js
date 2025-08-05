// src/resources/Config.js

const { getConfig } = require('../config');
const Base = require('./Base');

class Config {
  constructor() {
    super('config');
     this.config = getConfig();
  }

  accessToken() {
    return this.config.accessToken;
  }
}

module.exports = Config;