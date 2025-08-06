import { SiteFormConfig } from '@tanqory/site-utils';
import { Base } from './Base';
import { GeneralSettings } from '../types';

export class General extends Base {
  constructor() {
    super('general');
    this.formId = SiteFormConfig.SITES_SETTING_FORM_ID_GENERAL;
  }
  
  async getSettings(): Promise<GeneralSettings> {
    const data = await this.docs<GeneralSettings>();
    return data.items?.[0] || {};
  }
}
