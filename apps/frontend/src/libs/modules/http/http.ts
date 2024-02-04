import { BaseHTTP } from "./base-http.module.ts";

const http = new BaseHTTP();

export { http };
export { HTTPCode, HTTPHeader } from "./libs/enums/enums.ts";
export { HTTPError } from "./libs/exceptions/exceptions.ts";
export { type HTTP, type HTTPOptions } from "./libs/types/types.ts";
