import { getConfig } from '../config';
import { TanqoryConfig } from '../types';

export class Config {
  private config: TanqoryConfig;

  constructor() {
    this.config = getConfig();
  }

  accessToken(): string | null {
    return this.config.accessToken;
  }

  refreshToken(): string | null {
    return this.config.refreshToken;
  }

  siteId(): string | null {
    return this.config.siteId;
  }

  apiUrl(): string {
    return this.config.apiUrl;
  }
}
