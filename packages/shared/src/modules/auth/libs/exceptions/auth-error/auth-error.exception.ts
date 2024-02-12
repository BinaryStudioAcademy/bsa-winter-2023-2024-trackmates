import { HTTPError } from "../../../../../libs/exceptions/exceptions.js";
import { HTTPCode } from "../../../../../libs/modules/http/http.js";

class AuthError extends HTTPError {
	public constructor(message: string) {
		super({
			message,
			status: HTTPCode.UNAUTHORIZED,
		});
	}
}

export { AuthError };
