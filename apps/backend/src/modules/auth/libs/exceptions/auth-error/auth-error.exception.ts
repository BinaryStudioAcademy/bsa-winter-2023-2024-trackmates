import { HTTPCode, HTTPError } from "~/libs/modules/http/http.js";

class AuthError extends HTTPError {
	public constructor(message: string) {
		super({
			message,
			status: HTTPCode.UNAUTHORIZED,
		});
	}
}

export { AuthError };
