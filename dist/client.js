"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const Policy_1 = require("./resources/Policy");
const General_1 = require("./resources/General");
const Page_1 = require("./resources/Page");
const Blog_1 = require("./resources/Blog");
const Post_1 = require("./resources/Post");
const Menu_1 = require("./resources/Menu");
const Product_1 = require("./resources/Product");
const Collection_1 = require("./resources/Collection");
const Config_1 = require("./resources/Config");
class Client {
    constructor() {
        this.policy = new Policy_1.Policy();
        this.general = new General_1.General();
        this.page = new Page_1.PageResource();
        this.blog = new Blog_1.Blog();
        this.post = new Post_1.PostResource();
        this.menu = new Menu_1.MenuResource();
        this.product = new Product_1.ProductResource();
        this.collection = new Collection_1.CollectionResource();
        this.config = new Config_1.Config();
    }
}
exports.Client = Client;
//# sourceMappingURL=client.js.map