import { Policy } from './resources/Policy';
import { General } from './resources/General';
import { PageResource } from './resources/Page';
import { Blog } from './resources/Blog';
import { PostResource } from './resources/Post';
import { MenuResource } from './resources/Menu';
import { ProductResource } from './resources/Product';
import { CollectionResource } from './resources/Collection';
import { Config } from './resources/Config';

export class Client {
  public readonly policy: Policy;
  public readonly general: General;
  public readonly page: PageResource;
  public readonly blog: Blog;
  public readonly post: PostResource;
  public readonly menu: MenuResource;
  public readonly product: ProductResource;
  public readonly collection: CollectionResource;
  public readonly config: Config;

  constructor() {
    this.policy = new Policy();
    this.general = new General();
    this.page = new PageResource();
    this.blog = new Blog();
    this.post = new PostResource();
    this.menu = new MenuResource();
    this.product = new ProductResource();
    this.collection = new CollectionResource();
    this.config = new Config();
  }
}
