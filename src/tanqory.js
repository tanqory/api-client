// src/tanqory.js

const Client = require('./client');
const { setConfig } = require('./config');

const Tanqory = {
  init: (options) => {
    setConfig(options);
    return new Client();
  }
};

module.exports = Tanqory;