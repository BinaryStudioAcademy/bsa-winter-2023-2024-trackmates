import { type HTTPMethod } from "./http-method.type.js";

type HTTPOptions = {
	headers: Headers;
	method: HTTPMethod;
	payload: BodyInit | null;
	query?: Record<string, unknown>;
};

export { type HTTPOptions };
