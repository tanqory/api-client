import { Base } from './Base';
import { Post, QueryOptions, ApiResponse } from '../types';
export declare class PostResource extends Base {
    constructor();
    getAllPosts(options?: QueryOptions): Promise<ApiResponse<Post>>;
    getPost(id: string): Promise<Post>;
}
//# sourceMappingURL=Post.d.ts.map