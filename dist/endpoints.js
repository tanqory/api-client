"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endpoints = exports.API_AUTH = exports.API_SITES = exports.API_STORAGE = exports.API_FORMS = void 0;
exports.API_FORMS = process.env.API_FORMS || "https://api-forms.tanqory.com";
exports.API_STORAGE = process.env.API_STORAGE || "https://api-storage.tanqory.com";
exports.API_SITES = process.env.API_SITES || "https://api.tanqory.com";
exports.API_AUTH = process.env.API_AUTH || "https://api-auth.tanqory.com";
exports.endpoints = {
    API_FORMS: exports.API_FORMS,
    API_STORAGE: exports.API_STORAGE,
    API_SITES: exports.API_SITES,
    API_AUTH: exports.API_AUTH,
};
//# sourceMappingURL=endpoints.js.map