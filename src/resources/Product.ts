import { Base } from './Base';
import { Product } from '../types';

export class ProductResource extends Base {
  constructor() {
    super('product');
  }

  async searchByName(name: string): Promise<Product[]> {
    console.log(`Searching for products with name: ${name} for site ${this.config.siteId}`);
    const result = await this.all<Product>();
    return result?.data?.filter(p => p.name.includes(name)) || [];
  }
}
