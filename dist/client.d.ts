import { Policy } from './resources/Policy';
import { General } from './resources/General';
import { PageResource } from './resources/Page';
import { Blog } from './resources/Blog';
import { PostResource } from './resources/Post';
import { MenuResource } from './resources/Menu';
import { ProductResource } from './resources/Product';
import { CollectionResource } from './resources/Collection';
import { Config } from './resources/Config';
export declare class Client {
    readonly policy: Policy;
    readonly general: General;
    readonly page: PageResource;
    readonly blog: Blog;
    readonly post: PostResource;
    readonly menu: MenuResource;
    readonly product: ProductResource;
    readonly collection: CollectionResource;
    readonly config: Config;
    constructor();
}
//# sourceMappingURL=client.d.ts.map