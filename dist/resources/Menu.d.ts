import { Base } from './Base';
import { Menu, QueryOptions, ApiResponse } from '../types';
export declare class MenuResource extends Base {
    constructor();
    getAllMenus(options?: QueryOptions): Promise<ApiResponse<Menu>>;
    getMenu(id: string): Promise<Menu>;
}
//# sourceMappingURL=Menu.d.ts.map