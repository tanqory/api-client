import { TanqoryConfig, QueryOptions, ApiResponse, RequestOptions, BaseResource } from '../types';
export declare class Base {
    protected resourceName: string;
    protected config: TanqoryConfig;
    protected formId?: string;
    constructor(resourceName: string);
    protected _request<T = any>(url: string, options?: RequestOptions, retryCount?: number): Promise<T>;
    docs<T = BaseResource>(options?: QueryOptions): Promise<ApiResponse<T>>;
    doc<T = BaseResource>(id: string): Promise<T>;
    all<T = BaseResource>(options?: QueryOptions): Promise<ApiResponse<T> | null>;
    find<T = BaseResource>(id: string): Promise<T | null>;
    save<T extends BaseResource>(data: Partial<T>): Promise<T & {
        siteId: string;
    }>;
    next<T = BaseResource>(currentPageOptions: ApiResponse<T>): Promise<ApiResponse<T> | null>;
    previous<T = BaseResource>(currentPageOptions: ApiResponse<T>): Promise<ApiResponse<T> | null>;
}
//# sourceMappingURL=Base.d.ts.map