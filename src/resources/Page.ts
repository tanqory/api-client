import { SiteFormConfig } from '@tanqory/site-utils';
import { Base } from './Base';
import { Page, QueryOptions, ApiResponse } from '../types';

export class PageResource extends Base {
  constructor() {
    super('page');
    this.formId = SiteFormConfig.SITES_FORM_ID_ONLINE_STORE_PAGE;
  }
  
  async getAllPages(options: QueryOptions = {}): Promise<ApiResponse<Page>> {
    return await this.docs<Page>(options);
  }
  
  async getPage(id: string): Promise<Page> {
    return await this.doc<Page>(id);
  }
}
