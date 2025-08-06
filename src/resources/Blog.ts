import { SiteFormConfig } from '@tanqory/site-utils';
import { Base } from './Base';
import { Post, QueryOptions, ApiResponse } from '../types';

export class Blog extends Base {
  constructor() {
    super('blog');
    this.formId = SiteFormConfig.SITES_FORM_ID_ONLINE_STORE_BLOG;
  }
  
  async getAllBlogPosts(options: QueryOptions = {}): Promise<ApiResponse<Post>> {
    return await this.docs<Post>(options);
  }
  
  async getBlogPost(id: string): Promise<Post> {
    return await this.doc<Post>(id);
  }
}
