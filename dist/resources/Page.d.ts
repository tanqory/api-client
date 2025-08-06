import { Base } from './Base';
import { Page, QueryOptions, ApiResponse } from '../types';
export declare class PageResource extends Base {
    constructor();
    getAllPages(options?: QueryOptions): Promise<ApiResponse<Page>>;
    getPage(id: string): Promise<Page>;
}
//# sourceMappingURL=Page.d.ts.map