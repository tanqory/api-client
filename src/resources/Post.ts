import { SiteFormConfig } from '@tanqory/site-utils';
import { Base } from './Base';
import { Post, QueryOptions, ApiResponse } from '../types';

export class PostResource extends Base {
  constructor() {
    super('post');
    this.formId = SiteFormConfig.SITES_FORM_ID_ONLINE_STORE_POST;
  }
  
  async getAllPosts(options: QueryOptions = {}): Promise<ApiResponse<Post>> {
    return await this.docs<Post>(options);
  }
  
  async getPost(id: string): Promise<Post> {
    return await this.doc<Post>(id);
  }
}
