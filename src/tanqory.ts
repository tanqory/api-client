import { Client } from './client';
import { setConfig } from './config';
import { TanqoryInitOptions } from './types';

export interface TanqoryInterface {
  init: (options: TanqoryInitOptions) => Client;
}

export const Tanqory: TanqoryInterface = {
  init: (options: TanqoryInitOptions): Client => {
    setConfig(options);
    return new Client();
  }
};

export default Tanqory;

// Export types for consumers
export * from './types';
export { Client } from './client';
