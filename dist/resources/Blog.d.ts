import { Base } from './Base';
import { Post, QueryOptions, ApiResponse } from '../types';
export declare class Blog extends Base {
    constructor();
    getAllBlogPosts(options?: QueryOptions): Promise<ApiResponse<Post>>;
    getBlogPost(id: string): Promise<Post>;
}
//# sourceMappingURL=Blog.d.ts.map