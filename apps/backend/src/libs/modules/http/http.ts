import { BaseHttp } from "./base-http.module.js";

const http = new BaseHttp();

export { http };
export { HTTPCode, HTTPHeader } from "./libs/enums/enums.js";
export { HTTPError } from "./libs/exceptions/exceptions.js";
export { type HTTPMethod, type Http } from "./libs/types/types.js";
