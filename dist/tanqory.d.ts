import { Client } from './client';
import { TanqoryInitOptions } from './types';
export interface TanqoryInterface {
    init: (options: TanqoryInitOptions) => Client;
}
export declare const Tanqory: TanqoryInterface;
export default Tanqory;
export * from './types';
export { Client } from './client';
//# sourceMappingURL=tanqory.d.ts.map