"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductResource = void 0;
const Base_1 = require("./Base");
class ProductResource extends Base_1.Base {
    constructor() {
        super('product');
    }
    async searchByName(name) {
        var _a;
        console.log(`Searching for products with name: ${name} for site ${this.config.siteId}`);
        const result = await this.all();
        return ((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.filter(p => p.name.includes(name))) || [];
    }
}
exports.ProductResource = ProductResource;
//# sourceMappingURL=Product.js.map