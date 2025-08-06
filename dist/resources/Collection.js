"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollectionResource = void 0;
const Base_1 = require("./Base");
class CollectionResource extends Base_1.Base {
    constructor() {
        super('collection');
    }
    async searchByName(name) {
        var _a;
        console.log(`Searching for collections with name: ${name} for site ${this.config.siteId}`);
        const result = await this.all();
        return ((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.filter(c => c.name.includes(name))) || [];
    }
}
exports.CollectionResource = CollectionResource;
//# sourceMappingURL=Collection.js.map