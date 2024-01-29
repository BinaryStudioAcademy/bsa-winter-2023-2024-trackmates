import { type HTTPMethod } from "./http-method.type.js";

type HTTPOptions = {
	method: HTTPMethod;
	payload: BodyInit | null;
	headers: Headers;
};

export { type HTTPOptions };
