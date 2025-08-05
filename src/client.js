// src/client.js

const Policy = require('./resources/Policy');
const General = require('./resources/General');
const Page = require('./resources/Page');
const Blog = require('./resources/Blog');
const Post = require('./resources/Post');
const Menu = require('./resources/Menu');
const Product = require('./resources/Product');
const Collection = require('./resources/Collection');

class Client {
  constructor() {
    this.policy = new Policy();
    this.general = new General();
    this.page = new Page();
    this.blog = new Blog();
    this.post = new Post();
    this.menu = new Menu();
    this.product = new Product();
    this.collection = new Collection(); 
  }
}

module.exports = Client;