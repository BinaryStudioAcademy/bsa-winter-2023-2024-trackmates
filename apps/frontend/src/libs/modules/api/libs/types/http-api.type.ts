import { type HTTPApiOptions } from "./types.ts";

type HTTPApi = {
  load(path: string, options: HTTPApiOptions): Promise<Response>;
};

export { type HTTPApi };
