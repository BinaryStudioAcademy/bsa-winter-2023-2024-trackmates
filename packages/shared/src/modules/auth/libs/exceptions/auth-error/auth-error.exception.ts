import {
	type HTTPCode,
	HTTPError,
} from "../../../../../libs/modules/http/http.js";
import { type ValueOf } from "../../../../../libs/types/value-of.type.js";

class AuthError extends HTTPError {
	public constructor(message: string, status: ValueOf<typeof HTTPCode>) {
		super({
			message,
			status,
		});
	}
}

export { AuthError };
