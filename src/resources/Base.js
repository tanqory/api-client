// src/resources/Base.js

const { getConfig, checkConfig, setConfig } = require('../config');
const { API_FORMS, API_AUTH, API_SITES } = require('../endpoints');

const refreshToken = async () => {
  const { refreshToken, siteId } = getConfig();
  if (!refreshToken) {
    throw new Error("No refresh token available. User must log in again.");
  }
  
  console.log("Access Token expired. Attempting to refresh token...");
  
  try {
    const url = `${API_AUTH}/api/v1/auth/token/refresh-access-token`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${refreshToken}`,
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
    setConfig({
      accessToken: data.access_token,
      refreshToken: data.refresh_token
    });

    console.log("Token refreshed successfully.");
    return data.access_token;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw new Error("Could not refresh token. Please log in again.");
  }
};

class Base {
  constructor(resourceName) {
    this.resourceName = resourceName;
    checkConfig();
    this.config = getConfig();
  }

  async _request(url, options = {}, retryCount = 1) {
    const { accessToken } = getConfig();
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      ...options.headers
    };

    try {
      const response = await fetch(url, { ...options, headers });
      
      if (response.status === 401 && retryCount > 0) {
        // ถ้า Access Token หมดอายุ ให้ลอง Refresh Token
        console.warn("Unauthorized request. Attempting to refresh token and retry...");
        const newAccessToken = await refreshToken();
        
        // ลองเรียก API เดิมอีกครั้งด้วย Token ใหม่
        return this._request(url, { ...options, headers: { ...options.headers, 'Authorization': `Bearer ${newAccessToken}` } }, 0);
      }
      
      if (!response.ok) {
        // ถ้าเป็น error อื่นๆ ให้ส่ง Error
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API Error: ${response.status} - ${errorData.message || response.statusText}`);
      }

      // ถ้าสำเร็จ ให้ส่ง Response JSON
      return await response.json();
      
    } catch (error) {
      // Catch error จาก fetch หรือ error ที่เรา throw เอง
      console.error("Request failed:", error);
      throw error;
    }
  }

  async docs(options = {}) {
    const url = new URL(`${API_FORMS}/api/v1/document-site/sites/${this.config.siteId}/forms/${this.formId}`);
    const params = {
        limit: options.limit || 10,
        next: options.next || "",
        sort: options.sort || "desc",
        order: options.order || "_id",
        search: options.search || "",
      }
    // วนลูปผ่าน options เพื่อสร้าง query parameters
    for (const key in params) {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key]);
      }
    }
    const response = await this._request(url.href, { method: 'GET' });
    return response;
  }

  async doc(id) {
    const url = new URL(`${API_FORMS}/api/v1/document-site/sites/${this.config.siteId}/forms/${this.formId}/document/${id}`);
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
    if(this.resourceName === 'collection') {
      const url = new URL(`${API_SITES}/api/v1/sites/${this.config.siteId}/collections`);
      for (const key in params) {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key]);
        }
      }
      const response = await this._request(url.href, { method: 'GET' });
      return response;
    } else if(this.resourceName === 'product') {
      const url = new URL(`${API_SITES}/api/v1/sites/${this.config.siteId}/products`);
      for (const key in params) {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key]);
        }
      }
      const response = await this._request(url.href, { method: 'GET' });
      return response;
    }
    return null;
    // console.log(`Fetching all ${this.resourceName}s for site ${this.config.siteId}...`);
    
    // // โค้ดจริงจะสร้าง URL ที่มี Query Parameters
    // const { limit, page } = options;
    // const url = new URL(`${this.config.apiUrl}/sites/${this.config.siteId}/${this.resourceName}s`);
    // if (limit) url.searchParams.append('limit', limit);
    // if (page) url.searchParams.append('page', page);

    // // โค้ดจำลองข้อมูล
    // const totalCount = 35;
    // const pageSize = limit || 10;
    // const currentPage = page || 1;
    // const start = (currentPage - 1) * pageSize;
    // const end = start + pageSize;
    
    // const dummyData = Array.from({ length: totalCount }, (_, i) => ({
    //   id: `id-${i + 1}`,
    //   name: `${this.resourceName} ${i + 1}`
    // }));

    // const paginatedData = dummyData.slice(start, end);
    
    // return {
    //   data: paginatedData,
    //   pagination: {
    //     total: totalCount,
    //     count: paginatedData.length,
    //     limit: pageSize,
    //     page: currentPage,
    //     hasNext: end < totalCount,
    //     hasPrevious: start > 0
    //   }
    // };
  }

  // เมธอดสำหรับเรียกข้อมูลตาม ID
  async find(id) {
    if(this.resourceName === 'collection') {
      const url = new URL(`${API_SITES}/api/v1/sites/${this.config.siteId}/collections/${id}`);
      const response = await this._request(url.href, { method: 'GET' });
      return response;
    } else if(this.resourceName === 'product') {
      const url = new URL(`${API_SITES}/api/v1/sites/${this.config.siteId}/products/${id}`);
      const response = await this._request(url.href, { method: 'GET' });
      return response;
    }
    return null;
    // console.log(`Finding ${this.resourceName} with ID: ${id} for site ${this.config.siteId}`);
    // return { id, name: `${this.resourceName} ${id}`, siteId: this.config.siteId };
  }

  // เมธอดสำหรับสร้างหรืออัปเดตข้อมูล
  async save(data) {
    console.log(`Saving ${this.resourceName} for site ${this.config.siteId}...`);
    return { id: data.id || `new-${this.resourceName}-${Date.now()}`, ...data, siteId: this.config.siteId };
  }
  
  // เมธอดสำหรับไปหน้าถัดไป
  async next(currentPageOptions) {
    if (currentPageOptions && currentPageOptions.pagination.hasNext) {
      const nextPageOptions = {
        limit: currentPageOptions.pagination.limit,
        page: currentPageOptions.pagination.page + 1
      };
      return await this.all(nextPageOptions);
    }
    return null;
  }

  // เมธอดสำหรับไปหน้าก่อนหน้า
  async previous(currentPageOptions) {
    if (currentPageOptions && currentPageOptions.pagination.hasPrevious) {
      const previousPageOptions = {
        limit: currentPageOptions.pagination.limit,
        page: currentPageOptions.pagination.page - 1
      };
      return await this.all(previousPageOptions);
    }
    return null;
  }
}

module.exports = Base;