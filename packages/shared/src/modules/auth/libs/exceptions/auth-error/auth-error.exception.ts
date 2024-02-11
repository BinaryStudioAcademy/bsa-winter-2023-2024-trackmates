import { HTTPError } from "~/libs/exceptions/exceptions.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
import { type ValueOf } from "~/libs/types/types.js";

type Constructor = {
	cause?: unknown;
	message: string;
	status?: ValueOf<typeof HTTPCode>;
};

class AuthError extends HTTPError {
	public constructor({
		cause,
		message,
		status = HTTPCode.UNAUTHORIZED,
	}: Constructor) {
		super({
			cause,
			message,
			status,
		});
	}
}

export { AuthError };
