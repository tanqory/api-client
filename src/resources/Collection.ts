import { Base } from './Base';
import { Collection } from '../types';

export class CollectionResource extends Base {
  constructor() {
    super('collection');
  }

  async searchByName(name: string): Promise<Collection[]> {
    console.log(`Searching for collections with name: ${name} for site ${this.config.siteId}`);
    const result = await this.all<Collection>();
    return result?.data?.filter(c => c.name.includes(name)) || [];
  }
}
