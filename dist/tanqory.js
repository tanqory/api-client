"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.Tanqory = void 0;
const client_1 = require("./client");
const config_1 = require("./config");
exports.Tanqory = {
    init: (options) => {
        (0, config_1.setConfig)(options);
        return new client_1.Client();
    }
};
exports.default = exports.Tanqory;
// Export types for consumers
__exportStar(require("./types"), exports);
var client_2 = require("./client");
Object.defineProperty(exports, "Client", { enumerable: true, get: function () { return client_2.Client; } });
//# sourceMappingURL=tanqory.js.map