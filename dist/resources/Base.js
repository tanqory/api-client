"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Base = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const config_1 = require("../config");
const refreshToken = async (_url) => {
    const { refreshToken: token } = (0, config_1.getConfig)();
    if (!token) {
        throw new Error("No refresh token available. User must log in again.");
    }
    console.log("Access Token expired. Attempting to refresh token...");
    try {
        const url = `${_url}/api/v1/auth/token/refresh-access-token`;
        const response = await (0, node_fetch_1.default)(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            // ถ้า Refresh Token หมดอายุด้วย
            throw new Error(`Failed to refresh token: ${response.statusText}`);
        }
        const data = await response.json();
        if (!data.access_token || !data.refresh_token) {
            throw new Error("Invalid response from refresh token endpoint.");
        }
        // ตั้งค่า token ใหม่ใน config
        (0, config_1.setConfig)({
            accessToken: data.access_token,
            refreshToken: data.refresh_token
        });
        console.log("Token refreshed successfully.");
        return data.access_token;
    }
    catch (error) {
        console.error("Error refreshing token:", error);
        throw new Error("Could not refresh token. Please log in again.");
    }
};
class Base {
    constructor(resourceName) {
        this.resourceName = resourceName;
        (0, config_1.checkConfig)();
        this.config = (0, config_1.getConfig)();
    }
    async _request(url, options = {}, retryCount = 1) {
        const { accessToken } = (0, config_1.getConfig)();
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            ...options.headers
        };
        try {
            const response = await (0, node_fetch_1.default)(url, { ...options, headers });
            if (response.status === 401 && retryCount > 0) {
                // ถ้า Access Token หมดอายุ ให้ลอง Refresh Token
                console.warn("Unauthorized request. Attempting to refresh token and retry...");
                const newAccessToken = await refreshToken(this.config.apiAuthUrl);
                // ลองเรียก API เดิมอีกครั้งด้วย Token ใหม่
                return this._request(url, {
                    ...options,
                    headers: {
                        ...options.headers,
                        'Authorization': `Bearer ${newAccessToken}`
                    }
                }, 0);
            }
            if (!response.ok) {
                // ถ้าเป็น error อื่นๆ ให้ส่ง Error
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`API Error: ${response.status} - ${errorData.message || response.statusText}`);
            }
            // ถ้าสำเร็จ ให้ส่ง Response JSON
            return await response.json();
        }
        catch (error) {
            // Catch error จาก fetch หรือ error ที่เรา throw เอง
            console.error("Request failed:", error);
            throw error;
        }
    }
    async docs(options = {}) {
        const url = new URL(`${this.config.apiFormsUrl}/api/v1/document-site/sites/${this.config.siteId}/forms/${this.formId}`);
        const params = {
            limit: options.limit || 10,
            next: options.next || "",
            sort: options.sort || "desc",
            order: options.order || "_id",
            search: options.search || "",
        };
        // วนลูปผ่าน options เพื่อสร้าง query parameters
        for (const key in params) {
            if (params[key] !== undefined && params[key] !== null) {
                url.searchParams.append(key, String(params[key]));
            }
        }
        const response = await this._request(url.href, { method: 'GET' });
        return response;
    }
    async doc(id) {
        const url = new URL(`${this.config.apiFormsUrl}/api/v1/document-site/sites/${this.config.siteId}/forms/${this.formId}/document/${id}`);
        const response = await this._request(url.href, { method: 'GET' });
        return response;
    }
    // เมธอดสำหรับเรียกข้อมูลทั้งหมด
    async all(options = {}) {
        const params = {
            limit: options.limit || 10,
            next: options.next || "",
            sort: options.sort || "desc",
            order: options.order || "_id",
            search: options.search || "",
            country: options.country || "",
        };
        if (this.resourceName === 'collection') {
            const url = new URL(`${this.config.apiSitesUrl}/api/v1/sites/${this.config.siteId}/collections`);
            for (const key in params) {
                if (params[key] !== undefined && params[key] !== null) {
                    url.searchParams.append(key, String(params[key]));
                }
            }
            const response = await this._request(url.href, { method: 'GET' });
            return response;
        }
        else if (this.resourceName === 'product') {
            const url = new URL(`${this.config.apiSitesUrl}/api/v1/sites/${this.config.siteId}/products`);
            for (const key in params) {
                if (params[key] !== undefined && params[key] !== null) {
                    url.searchParams.append(key, String(params[key]));
                }
            }
            const response = await this._request(url.href, { method: 'GET' });
            return response;
        }
        return null;
    }
    // เมธอดสำหรับเรียกข้อมูลตาม ID
    async find(id) {
        if (this.resourceName === 'collection') {
            const url = new URL(`${this.config.apiSitesUrl}/api/v1/sites/${this.config.siteId}/collections/${id}`);
            const response = await this._request(url.href, { method: 'GET' });
            return response;
        }
        else if (this.resourceName === 'product') {
            const url = new URL(`${this.config.apiSitesUrl}/api/v1/sites/${this.config.siteId}/products/${id}`);
            const response = await this._request(url.href, { method: 'GET' });
            return response;
        }
        return null;
    }
    // เมธอดสำหรับสร้างหรืออัปเดตข้อมูล
    async save(data) {
        console.log(`Saving ${this.resourceName} for site ${this.config.siteId}...`);
        return {
            ...data,
            id: data.id || `new-${this.resourceName}-${Date.now()}`,
            siteId: this.config.siteId
        };
    }
    // เมธอดสำหรับไปหน้าถัดไป
    async next(currentPageOptions) {
        var _a;
        if ((_a = currentPageOptions === null || currentPageOptions === void 0 ? void 0 : currentPageOptions.pagination) === null || _a === void 0 ? void 0 : _a.hasNext) {
            const nextPageOptions = {
                limit: currentPageOptions.pagination.limit,
                page: (currentPageOptions.pagination.page || 1) + 1
            };
            return await this.all(nextPageOptions);
        }
        return null;
    }
    // เมธอดสำหรับไปหน้าก่อนหน้า
    async previous(currentPageOptions) {
        var _a;
        if ((_a = currentPageOptions === null || currentPageOptions === void 0 ? void 0 : currentPageOptions.pagination) === null || _a === void 0 ? void 0 : _a.hasPrevious) {
            const previousPageOptions = {
                limit: currentPageOptions.pagination.limit,
                page: (currentPageOptions.pagination.page || 1) - 1
            };
            return await this.all(previousPageOptions);
        }
        return null;
    }
}
exports.Base = Base;
//# sourceMappingURL=Base.js.map