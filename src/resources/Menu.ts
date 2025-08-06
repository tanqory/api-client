import { SiteFormConfig } from '@tanqory/site-utils';
import { Base } from './Base';
import { Menu, QueryOptions, ApiResponse } from '../types';

export class MenuResource extends Base {
  constructor() {
    super('menu');
    this.formId = SiteFormConfig.SITES_FORM_ID_ONLINE_STORE_MENU;
  }
  
  async getAllMenus(options: QueryOptions = {}): Promise<ApiResponse<Menu>> {
    return await this.docs<Menu>(options);
  }
  
  async getMenu(id: string): Promise<Menu> {
    return await this.doc<Menu>(id);
  }
}
