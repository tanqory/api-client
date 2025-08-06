export interface TanqoryConfig {
  accessToken: string | null;
  refreshToken: string | null;
  apiUrl: string;
  siteId: string | null;
}

export interface TanqoryInitOptions {
  accessToken?: string;
  refreshToken?: string;
  apiUrl?: string;
  siteId?: string;
}

export interface QueryOptions {
  limit?: number;
  next?: string;
  sort?: string;
  order?: 'asc' | 'desc';
  search?: string;
  country?: string;
  page?: number;
}

export interface PaginationInfo {
  total?: number;
  count?: number;
  limit?: number;
  page?: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export interface ApiResponse<T> {
  data?: T[];
  items?: T[];
  next?: string;
  total?: number;
  limit?: number;
  pagination?: PaginationInfo;
}

export interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

// Resource interfaces
export interface BaseResource {
  id: string;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface Product extends BaseResource {
  description?: string;
  price?: number;
  currency?: string;
  images?: string[];
  category?: string;
  tags?: string[];
  stock?: number;
  sku?: string;
}

export interface Collection extends BaseResource {
  description?: string;
  products?: Product[];
  image?: string;
}

export interface Page extends BaseResource {
  content?: string;
  title?: string;
  meta_description?: string;
  slug?: string;
  published?: boolean;
}

export interface Post extends BaseResource {
  title?: string;
  content?: string;
  excerpt?: string;
  featured_image?: string;
  published_at?: string;
  author?: string;
  tags?: string[];
  categories?: string[];
}

export interface Menu extends BaseResource {
  items?: MenuItem[];
  location?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  url?: string;
  target?: string;
  children?: MenuItem[];
}

export interface GeneralSettings {
  site_name?: string;
  site_description?: string;
  currency?: string;
  timezone?: string;
  language?: string;
  logo?: string;
  favicon?: string;
}

export interface PolicyData {
  privacy_policy?: string;
  terms_of_service?: string;
  cookie_policy?: string;
  refund_policy?: string;
}
