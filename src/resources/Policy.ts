import { SiteFormConfig } from '@tanqory/site-utils';
import { Base } from './Base';
import { PolicyData } from '../types';

export class Policy extends Base {
  constructor() {
    super('policy');
    this.formId = SiteFormConfig.SITES_SETTING_FORM_ID_PRIVACY_DATA;
  }
  
  async getAllPolicies(): Promise<PolicyData> {
    const data = await this.docs<PolicyData>();
    return data.items?.[0] || {};
  }
}
