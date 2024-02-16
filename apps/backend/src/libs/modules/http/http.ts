import { BaseHTTP } from "./base-http.module.js";

const http = new BaseHTTP();

export { http };
export { ContentType, HTTPCode, HTTPHeader } from "./libs/enums/enums.js";
export { HTTPError } from "./libs/exceptions/exceptions.js";
export { type HTTP, type HTTPMethod } from "./libs/types/types.js";
