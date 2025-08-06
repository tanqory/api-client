declare module 'node-fetch' {
  export interface RequestInit {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
  }

  export interface Response {
    ok: boolean;
    status: number;
    statusText: string;
    json(): Promise<any>;
  }

  declare function fetch(url: string, init?: RequestInit): Promise<Response>;
  export default fetch;
}
