import fetch from 'node-fetch';
import { getConfig, checkConfig, setConfig } from '../config';
import { API_FORMS, API_AUTH, API_SITES } from '../endpoints';
import { 
  TanqoryConfig, 
  QueryOptions, 
  ApiResponse, 
  RequestOptions, 
  RefreshTokenResponse,
  BaseResource 
} from '../types';

const refreshToken = async (): Promise<string> => {
  const { refreshToken: token } = getConfig();
  if (!token) {
    throw new Error("No refresh token available. User must log in again.");
  }
  
  console.log("Access Token expired. Attempting to refresh token...");
  
  try {
    const url = `${API_AUTH}/api/v1/auth/token/refresh-access-token`;
    const response = await fetch(url, {
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

    const data = await response.json() as RefreshTokenResponse;
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

export class Base {
  protected resourceName: string;
  protected config: TanqoryConfig;
  protected formId?: string;

  constructor(resourceName: string) {
    this.resourceName = resourceName;
    checkConfig();
    this.config = getConfig();
  }

  protected async _request<T = any>(url: string, options: RequestOptions = {}, retryCount: number = 1): Promise<T> {
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
        return this._request<T>(url, { 
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
        throw new Error(`API Error: ${response.status} - ${(errorData as any).message || response.statusText}`);
      }

      // ถ้าสำเร็จ ให้ส่ง Response JSON
      return await response.json() as T;
      
    } catch (error) {
      // Catch error จาก fetch หรือ error ที่เรา throw เอง
      console.error("Request failed:", error);
      throw error;
    }
  }

  async docs<T = BaseResource>(options: QueryOptions = {}): Promise<ApiResponse<T>> {
    const url = new URL(`${API_FORMS}/api/v1/document-site/sites/${this.config.siteId}/forms/${this.formId}`);
    const params = {
      limit: options.limit || 10,
      next: options.next || "",
      sort: options.sort || "desc",
      order: options.order || "_id",
      search: options.search || "",
    };
    
    // วนลูปผ่าน options เพื่อสร้าง query parameters
    for (const key in params) {
      if (params[key as keyof typeof params] !== undefined && params[key as keyof typeof params] !== null) {
        url.searchParams.append(key, String(params[key as keyof typeof params]));
      }
    }
    
    const response = await this._request<ApiResponse<T>>(url.href, { method: 'GET' });
    return response;
  }

  async doc<T = BaseResource>(id: string): Promise<T> {
    const url = new URL(`${API_FORMS}/api/v1/document-site/sites/${this.config.siteId}/forms/${this.formId}/document/${id}`);
    const response = await this._request<T>(url.href, { method: 'GET' });
    return response;
  }

  // เมธอดสำหรับเรียกข้อมูลทั้งหมด
  async all<T = BaseResource>(options: QueryOptions = {}): Promise<ApiResponse<T> | null> {
    const params = {
      limit: options.limit || 10,
      next: options.next || "",
      sort: options.sort || "desc",
      order: options.order || "_id",
      search: options.search || "",
      country: options.country || "",
    };
    
    if (this.resourceName === 'collection') {
      const url = new URL(`${API_SITES}/api/v1/sites/${this.config.siteId}/collections`);
      for (const key in params) {
        if (params[key as keyof typeof params] !== undefined && params[key as keyof typeof params] !== null) {
          url.searchParams.append(key, String(params[key as keyof typeof params]));
        }
      }
      const response = await this._request<ApiResponse<T>>(url.href, { method: 'GET' });
      return response;
    } else if (this.resourceName === 'product') {
      const url = new URL(`${API_SITES}/api/v1/sites/${this.config.siteId}/products`);
      for (const key in params) {
        if (params[key as keyof typeof params] !== undefined && params[key as keyof typeof params] !== null) {
          url.searchParams.append(key, String(params[key as keyof typeof params]));
        }
      }
      const response = await this._request<ApiResponse<T>>(url.href, { method: 'GET' });
      return response;
    }
    return null;
  }

  // เมธอดสำหรับเรียกข้อมูลตาม ID
  async find<T = BaseResource>(id: string): Promise<T | null> {
    if (this.resourceName === 'collection') {
      const url = new URL(`${API_SITES}/api/v1/sites/${this.config.siteId}/collections/${id}`);
      const response = await this._request<T>(url.href, { method: 'GET' });
      return response;
    } else if (this.resourceName === 'product') {
      const url = new URL(`${API_SITES}/api/v1/sites/${this.config.siteId}/products/${id}`);
      const response = await this._request<T>(url.href, { method: 'GET' });
      return response;
    }
    return null;
  }

  // เมธอดสำหรับสร้างหรืออัปเดตข้อมูล
  async save<T extends BaseResource>(data: Partial<T>): Promise<T & { siteId: string }> {
    console.log(`Saving ${this.resourceName} for site ${this.config.siteId}...`);
    return {
      ...data,
      id: (data as any).id || `new-${this.resourceName}-${Date.now()}`, 
      siteId: this.config.siteId!
    } as unknown as T & { siteId: string };
  }
  
  // เมธอดสำหรับไปหน้าถัดไป
  async next<T = BaseResource>(currentPageOptions: ApiResponse<T>): Promise<ApiResponse<T> | null> {
    if (currentPageOptions?.pagination?.hasNext) {
      const nextPageOptions: QueryOptions = {
        limit: currentPageOptions.pagination.limit,
        page: (currentPageOptions.pagination.page || 1) + 1
      };
      return await this.all<T>(nextPageOptions);
    }
    return null;
  }

  // เมธอดสำหรับไปหน้าก่อนหน้า
  async previous<T = BaseResource>(currentPageOptions: ApiResponse<T>): Promise<ApiResponse<T> | null> {
    if (currentPageOptions?.pagination?.hasPrevious) {
      const previousPageOptions: QueryOptions = {
        limit: currentPageOptions.pagination.limit,
        page: (currentPageOptions.pagination.page || 1) - 1
      };
      return await this.all<T>(previousPageOptions);
    }
    return null;
  }
}
